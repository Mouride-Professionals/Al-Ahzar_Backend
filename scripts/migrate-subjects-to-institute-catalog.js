'use strict';

/**
 * One-off data migration: collapse the current per-school `subject` rows into
 * a single institute-wide catalog, and record each school's existing subject
 * as a `school-subject` selection instead.
 *
 * MUST be run BEFORE deploying the schema change that removes `subject.school`
 * (this script reads that relation, so it needs the old schema still live).
 *
 * Usage:
 *   DRY_RUN=1 node scripts/migrate-subjects-to-institute-catalog.js   # inspect the plan, no writes
 *   node scripts/migrate-subjects-to-institute-catalog.js             # apply
 */

const createStrapi = require('@strapi/strapi');

const DRY_RUN = process.env.DRY_RUN === '1';

function normalize(name) {
    return (name || '').trim().toLowerCase();
}

function slugCode(name) {
    return (name || '')
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 20);
}

async function run() {
    const app = await createStrapi().load();

    try {
        const allSubjects = await app.entityService.findMany('api::subject.subject', {
            populate: ['school'],
            publicationState: 'preview',
            limit: -1,
        });

        console.log(`[migration] Found ${allSubjects.length} existing subject rows.`);

        const groups = new Map();
        for (const subj of allSubjects) {
            const key = normalize(subj.subjectname);
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(subj);
        }

        console.log(`[migration] Collapsing into ${groups.size} canonical subjects.`);

        const usedCodes = new Set(
            allSubjects.map((s) => s.code).filter(Boolean).map((c) => c.toUpperCase())
        );

        let createdSchoolSubjects = 0;
        let remappedClassSubjects = 0;
        let deletedDuplicates = 0;

        for (const [key, group] of groups) {
            if (!key) {
                console.log(`[migration] Skipping ${group.length} subject(s) with empty name (ids: ${group.map((g) => g.id).join(', ')}).`);
                continue;
            }

            // Canonical = first row; prefer one that already has a code.
            const canonical = group.find((s) => s.code) || group[0];

            let canonicalCode = canonical.code;
            if (!canonicalCode) {
                let base = slugCode(canonical.subjectname) || `SUBJ${canonical.id}`;
                let candidate = base;
                let i = 1;
                while (usedCodes.has(candidate.toUpperCase())) {
                    candidate = `${base}${i++}`;
                }
                canonicalCode = candidate;
                usedCodes.add(canonicalCode.toUpperCase());
            }

            const conflictingCodes = [...new Set(group.map((s) => s.code).filter((c) => c && c !== canonicalCode))];
            if (conflictingCodes.length) {
                console.log(
                    `[migration] "${canonical.subjectname}" (canonical id ${canonical.id}) had conflicting codes across schools: ${conflictingCodes.join(', ')} -> kept "${canonicalCode}".`
                );
            }

            if (!DRY_RUN && (canonical.code !== canonicalCode)) {
                await app.entityService.update('api::subject.subject', canonical.id, {
                    data: { code: canonicalCode },
                });
            } else if (DRY_RUN && canonical.code !== canonicalCode) {
                console.log(`[migration] (dry-run) Would set subject ${canonical.id} code -> ${canonicalCode}`);
            }

            for (const subj of group) {
                if (!subj.school) {
                    console.log(`[migration] Subject id ${subj.id} ("${subj.subjectname}") has no school — skipping school-subject creation.`);
                } else {
                    const existing = await app.entityService.findMany('api::school-subject.school-subject', {
                        filters: { school: subj.school.id, subject: canonical.id },
                        limit: 1,
                    });

                    if (existing.length === 0) {
                        if (!DRY_RUN) {
                            await app.entityService.create('api::school-subject.school-subject', {
                                data: {
                                    school: subj.school.id,
                                    subject: canonical.id,
                                    isActive: subj.isActive !== false,
                                },
                            });
                        }
                        createdSchoolSubjects++;
                        console.log(
                            `[migration]${DRY_RUN ? ' (dry-run)' : ''} school ${subj.school.id} -> subject ${canonical.id} (${canonicalCode}), active=${subj.isActive !== false}`
                        );
                    }
                }

                if (subj.id !== canonical.id) {
                    const classSubjects = await app.entityService.findMany('api::class-subject.class-subject', {
                        filters: { subject: subj.id },
                        limit: -1,
                    });

                    for (const cs of classSubjects) {
                        if (!DRY_RUN) {
                            await app.entityService.update('api::class-subject.class-subject', cs.id, {
                                data: { subject: canonical.id },
                            });
                        }
                        remappedClassSubjects++;
                    }
                    if (classSubjects.length) {
                        console.log(
                            `[migration]${DRY_RUN ? ' (dry-run)' : ''} remapped ${classSubjects.length} class-subject row(s) from subject ${subj.id} -> ${canonical.id}`
                        );
                    }

                    if (!DRY_RUN) {
                        await app.entityService.delete('api::subject.subject', subj.id);
                    }
                    deletedDuplicates++;
                }
            }
        }

        console.log(
            `[migration] Done${DRY_RUN ? ' (dry-run, nothing written)' : ''}. school-subject created: ${createdSchoolSubjects}, class-subject remapped: ${remappedClassSubjects}, duplicate subjects removed: ${deletedDuplicates}.`
        );
    } finally {
        await app.destroy();
    }
}

run()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('[migration] Failed:', err);
        process.exit(1);
    });
