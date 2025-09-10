const { v4: uuidv4 } = require('uuid');
const XLSX = require('xlsx');

/**
 * Bulk Student Creation Service
 * Handles CSV/Excel import with validation and error reporting
 */

module.exports = ({ strapi }) => ({
  /**
   * Generate unique student identifier
   */
  async generateUniqueIdentifier() {
    const year = new Date().getFullYear();
    const prefix = `AL${year}`;

    // Find the highest existing identifier for this year
    const existingStudents = await strapi.entityService.findMany('api::student.student', {
      filters: {
        studentIdentifer: {
          $startsWith: prefix
        }
      },
      sort: { studentIdentifer: 'desc' },
      limit: 1
    });

    let nextNumber = 1;
    if (existingStudents.length > 0) {
      const lastIdentifier = existingStudents[0].studentIdentifer;
      const lastNumber = parseInt(lastIdentifier.replace(prefix, ''));
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    return `${prefix}${String(nextNumber).padStart(4, '0')}`;
  },

  /**
   * Generate Excel template for bulk student import
   */
  async generateTemplate() {
    const headers = [
      'firstname',
      'lastname',
      'gender',
      'dateOfBirth',
      'birthPlace',
      'tutorFirstname',
      'tutorLastname',
      'tutorPhoneNumber',
      'type',
      'socialStatus',
      'registrationComment',
      'className',
      'schoolName',
      'schoolYear'
    ];

    const sampleData = [
      {
        firstname: 'Amadou',
        lastname: 'Diop',
        gender: 'Homme',
        dateOfBirth: '2010-05-15',
        birthPlace: 'Touba',
        tutorFirstname: 'Moussa',
        tutorLastname: 'Diop',
        tutorPhoneNumber: '+221771234567',
        type: 'Nouveau',
        socialStatus: 'Non',
        registrationComment: 'Excellent élève',
        className: 'CM2',
        schoolName: 'Al-Azhar Ndame',
        schoolYear: '2024-2025'
      },
      {
        firstname: 'Fatou',
        lastname: 'Ndiaye',
        gender: 'Femme',
        dateOfBirth: '2011-08-22',
        birthPlace: 'Diourbel',
        tutorFirstname: 'Khadija',
        tutorLastname: 'Ndiaye',
        tutorPhoneNumber: '+221772345678',
        type: 'Ancien Passant',
        socialStatus: 'Réduction mensualité',
        registrationComment: 'Très motivée',
        className: 'CE2',
        schoolName: 'Al-Azhar Ndame',
        schoolYear: '2024-2025'
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet([
      // Headers row
      headers.reduce((obj, header) => ({ ...obj, [header]: header }), {}),
      // Sample data
      ...sampleData
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students Template');

    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  },

  /**
   * Validate student data before import
   */
  async validateStudentData(studentData) {
    const errors = [];
    const warnings = [];

    // Required fields validation
    const requiredFields = ['firstname', 'lastname', 'gender', 'dateOfBirth', 'birthPlace', 'tutorFirstname', 'tutorLastname', 'tutorPhoneNumber'];

    requiredFields.forEach(field => {
      if (!studentData[field] || studentData[field].toString().trim() === '') {
        errors.push(`Champ requis manquant: ${field}`);
      }
    });

    // Gender validation
    if (studentData.gender && !['Homme', 'Femme'].includes(studentData.gender)) {
      errors.push(`Genre invalide: ${studentData.gender}. Valeurs acceptées: Homme, Femme`);
    }

    // Date validation
    if (studentData.dateOfBirth) {
      let date;

      // Handle Excel serial numbers using XLSX utility
      if (typeof studentData.dateOfBirth === 'number') {
        // Use XLSX built-in date conversion
        date = XLSX.SSF.parse_date_code(studentData.dateOfBirth);
        if (date) {
          // Convert XLSX date object to JavaScript Date
          date = new Date(date.y, date.m - 1, date.d); // month is 0-indexed in JS
        }
      } else {
        // Regular string date
        date = new Date(studentData.dateOfBirth);
      }

      console.log('Parsed date:', date, 'from original:', studentData.dateOfBirth, 'type:', typeof studentData.dateOfBirth);

      if (!date || isNaN(date.getTime())) {
        errors.push(`Date de naissance invalide: ${studentData.dateOfBirth}`);
      } else {
        const age = new Date().getFullYear() - date.getFullYear();
        if (age < 3 || age > 25) {
          warnings.push(`Âge inhabituel: ${age} ans (${date.toISOString().split('T')[0]})`);
        }

        // Update the studentData with the properly formatted date
        studentData.dateOfBirth = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      }
    }

    // Type validation
    if (studentData.type && !['Ancien Redoublant', 'Ancien Passant', 'Nouveau'].includes(studentData.type)) {
      errors.push(`Type d'étudiant invalide: ${studentData.type}`);
    }

    // Social status validation
    if (studentData.socialStatus && !['Non', 'Réduction inscription', 'Réduction mensualité', 'Tout tarifs offerts'].includes(studentData.socialStatus)) {
      errors.push(`Statut social invalide: ${studentData.socialStatus}`);
    }

    // Phone number validation - UPDATED
    if (studentData.tutorPhoneNumber) {
      // Convert to string and handle scientific notation
      let phoneString = String(studentData.tutorPhoneNumber).trim();

      // Fix scientific notation (2.21771E+11 → 221771234567)
      if (phoneString.includes('E+')) {
        phoneString = Number(studentData.tutorPhoneNumber).toFixed(0);
      }

      const phoneRegex = /^(\+221)?[0-9]{9}$/;
      if (!phoneRegex.test(phoneString.replace(/\s/g, ''))) {
        warnings.push(`Format de téléphone inhabituel: ${phoneString}`);
      }

      // Update the studentData with the corrected phone number
      studentData.tutorPhoneNumber = phoneString;
    }

    // Check for duplicate student identifier
    if (studentData.studentIdentifer) {
      const existingStudent = await strapi.entityService.findMany('api::student.student', {
        filters: { studentIdentifer: studentData.studentIdentifer },
        limit: 1
      });
      if (existingStudent.length > 0) {
        errors.push(`Identifiant étudiant déjà existant: ${studentData.studentIdentifer}`);
      }
    }

    return { errors, warnings };
  },

  /**
   * Find or create related entities (class, school, school-year)
   */
  async findOrCreateRelatedEntities(studentData) {
    const entities = {};

    // Find school
    if (studentData.schoolName) {
      let school = await strapi.entityService.findMany('api::school.school', {
        filters: { name: studentData.schoolName },
        limit: 1
      });

      if (school.length === 0) {
        // school = await strapi.entityService.create('api::school.school', {
        //   data: {
        //     name: studentData.schoolName,
        //     address: 'À définir',
        //     phone: 'À définir',
        //     type: 'Centre', // Default type
        //     region: 'Diourbel', // Default region based on student birthplaces
        //     publishedAt: new Date() // Required for draft and publish
        //   }
        // });
        entities.school = null;
      } else {
        entities.school = school[0];
      }
    }

    // Find class
    if (studentData.className && entities.school) {
      let classEntity = await strapi.entityService.findMany('api::class.class', {
        filters: {
          name: studentData.className,
          school: entities.school.id
        },
        limit: 1
      });

      if (classEntity.length === 0 && entities.school) {
        classEntity = await strapi.entityService.create('api::class.class', {
          data: {
            name: studentData.className,
            level: studentData.className,
            cycle: 'primaire', // Default, can be updated
            school: entities.school.id
          }
        });
        entities.class = null;
      } else {
        entities.class = classEntity[0];
      }
    }

    // Find school year
    if (studentData.schoolYear) {
      let schoolYear = await strapi.entityService.findMany('api::school-year.school-year', {
        filters: { name: studentData.schoolYear },
        limit: 1
      });

      if (schoolYear.length === 0) {
        const [startYear, endYear] = studentData.schoolYear.split('-');
        schoolYear = await strapi.entityService.create('api::school-year.school-year', {
          data: {
            name: studentData.schoolYear,
            startDate: new Date(`${startYear}-09-01`),
            endDate: new Date(`${endYear}-06-30`),
            isActive: true
          }
        });
        entities.schoolYear = schoolYear;
        // entities.schoolYear = null;
      } else {
        entities.schoolYear = schoolYear[0];
      }
    }

    return entities;
  },

  /**
   * Process bulk student import from Excel/CSV data
   */
  async processBulkImport(fileBuffer, options = {}) {
    const {
      validateOnly = false,
      skipErrors = false,
      generateIdentifiers = true
    } = options;

    const results = {
      total: 0,
      success: 0,
      errors: 0,
      warnings: 0,
      details: [],
      createdStudents: [],
      errorDetails: []
    };

    try {
      // Parse Excel file with date conversion
      const workbook = XLSX.read(fileBuffer, {
        type: 'buffer',
        cellDates: true,  // Convert Excel dates to JavaScript dates
        dateNF: 'yyyy-mm-dd' // Format dates as YYYY-MM-DD
      });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const studentsData = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,  // Don't return raw values
        dateNF: 'yyyy-mm-dd' // Format dates consistently
      });

      results.total = studentsData.length;

      for (let i = 0; i < studentsData.length; i++) {
        const studentData = studentsData[i];
        const rowNumber = i + 2; // Excel row number (accounting for header)

        try {
          // Generate UNIQUE student identifier if not provided
          if (generateIdentifiers && !studentData.studentIdentifer) {
            studentData.studentIdentifer = await this.generateUniqueIdentifier();
          }

          // Validate student data
          const validation = await this.validateStudentData(studentData);

          if (validation.errors.length > 0) {
            results.errors++;
            results.errorDetails.push({
              row: rowNumber,
              student: `${studentData.firstname} ${studentData.lastname}`,
              errors: validation.errors
            });

            if (!skipErrors) {
              continue;
            }
          }

          if (validation.warnings.length > 0) {
            results.warnings++;
            results.details.push({
              row: rowNumber,
              student: `${studentData.firstname} ${studentData.lastname}`,
              warnings: validation.warnings
            });
          }

          // Skip actual creation if validateOnly
          if (validateOnly) {
            continue;
          }

          // Find or create related entities
          const entities = await this.findOrCreateRelatedEntities(studentData);

          // Prepare student creation data
          const studentCreateData = {
            firstname: studentData.firstname.trim(),
            lastname: studentData.lastname.trim(),
            gender: studentData.gender,
            dateOfBirth: studentData.dateOfBirth, // Keep as string instead of Date object
            birthPlace: studentData.birthPlace.trim(),
            tutorFirstname: studentData.tutorFirstname.trim(),
            tutorLastname: studentData.tutorLastname.trim(),
            tutorPhoneNumber: studentData.tutorPhoneNumber.trim(),
            type: studentData.type || 'Nouveau',
            socialStatus: studentData.socialStatus || 'Non',
            registrationComment: studentData.registrationComment || '',
            // Temporarily remove studentIdentifer to test
            studentIdentifer: studentData.studentIdentifer
          };



          console.log('About to create student with data:', JSON.stringify(studentCreateData, null, 2));

          // Create student
          const createdStudent = await strapi.entityService.create('api::student.student', {
            data: studentCreateData
          });

          // Create enrollment if class and school year are provided
          // Temporarily disabled to test student creation

          if (entities.class && entities.schoolYear) {
            await strapi.entityService.create('api::enrollment.enrollment', {
              data: {
                student: createdStudent.id,
                class: entities.class.id,
                schoolYear: entities.schoolYear.id,
                // the first day of the school year
                enrollmentDate: entities.schoolYear.startDate ?? new Date(),
              }
            });
          }


          results.success++;
          results.createdStudents.push({
            id: createdStudent.id,
            name: `${createdStudent.firstname} ${createdStudent.lastname}`,
            identifier: createdStudent.studentIdentifer
          });

        } catch (error) {
          console.error('Student creation error:', error);
          console.error('Error details:', {
            name: error.name,
            message: error.message,
            details: error.details,
            data: error.data,
            errors: error.errors
          });
          console.error('Student data:', studentData);
          results.errors++;

          // Try to extract more detailed error information
          let errorMessages = [error.message];
          if (error.details && error.details.errors) {
            errorMessages = error.details.errors.map(e => e.message || e);
          } else if (error.errors) {
            errorMessages = error.errors.map(e => e.message || e);
          }

          results.errorDetails.push({
            row: rowNumber,
            student: `${studentData.firstname || 'N/A'} ${studentData.lastname || 'N/A'}`,
            errors: errorMessages
          });
        }
      }

    } catch (error) {
      throw new Error(`Erreur lors du traitement du fichier: ${error.message}`);
    }

    return results;
  }
});
