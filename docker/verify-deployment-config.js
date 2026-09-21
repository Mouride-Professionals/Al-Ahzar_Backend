'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const EXPECTED_ROLE_FILE_COUNT = 15;
const MINIMUM_ROLE_PERMISSION_COUNT = 1000;

const appRoot = path.resolve(__dirname, '..');
const syncDirectory = path.join(appRoot, 'config/sync');

const fail = (message) => {
  process.stderr.write(`Deployment config preflight failed: ${message}\n`);
  process.exit(1);
};

if (!fs.existsSync(syncDirectory)) {
  fail(`missing config-sync directory at ${syncDirectory}`);
}

const roleFiles = fs
  .readdirSync(syncDirectory)
  .filter((name) => /^user-role\..+\.json$/.test(name))
  .sort();

if (roleFiles.length !== EXPECTED_ROLE_FILE_COUNT) {
  fail(
    `expected ${EXPECTED_ROLE_FILE_COUNT} role files, found ${roleFiles.length}`
  );
}

const roleTypes = new Set();
const roleConfigHash = crypto.createHash('sha256');
let declaredPermissions = 0;

for (const roleFile of roleFiles) {
  const rolePath = path.join(syncDirectory, roleFile);
  const roleBytes = fs.readFileSync(rolePath);
  const role = JSON.parse(roleBytes.toString('utf8'));

  if (!role.type || typeof role.type !== 'string') {
    fail(`${roleFile} has no valid role type`);
  }

  if (roleTypes.has(role.type)) {
    fail(`duplicate role type ${role.type}`);
  }
  roleTypes.add(role.type);

  if (!Array.isArray(role.permissions)) {
    fail(`${roleFile} has no permissions array`);
  }

  const actions = new Set();
  for (const permission of role.permissions) {
    if (!permission.action || typeof permission.action !== 'string') {
      fail(`${roleFile} contains a permission without a valid action`);
    }
    if (actions.has(permission.action)) {
      fail(`${roleFile} contains duplicate action ${permission.action}`);
    }
    actions.add(permission.action);
  }

  declaredPermissions += role.permissions.length;
  roleConfigHash.update(roleFile);
  roleConfigHash.update('\0');
  roleConfigHash.update(roleBytes);
  roleConfigHash.update('\0');
}

if (declaredPermissions < MINIMUM_ROLE_PERMISSION_COUNT) {
  fail(
    `expected at least ${MINIMUM_ROLE_PERMISSION_COUNT} permissions, found ${declaredPermissions}`
  );
}

if (process.argv.includes('--permissions-count')) {
  process.stdout.write(`${declaredPermissions}\n`);
  process.exit(0);
}

process.stdout.write(
  [
    'Deployment config preflight passed',
    `roleConfigHash=${roleConfigHash.digest('hex')}`,
    `roleFiles=${roleFiles.length}`,
    `declaredPermissions=${declaredPermissions}`,
  ].join('\n') + '\n'
);
