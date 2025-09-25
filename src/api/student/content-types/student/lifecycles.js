"use strict";

/**
 * Student lifecycles
 * Auto-generate `studentIdentifer` for new students when not provided.
 * Format: AZ + last-two-digits-of-year + 5 random chars from 0-9,A-Z
 * Example: AZ25A9Z0
 */

const { generateUniqueIdentifier } = require('../../utils/identifier');

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    if (!data) return;

    if (!data.studentIdentifer) {
      data.studentIdentifer = await generateUniqueIdentifier(strapi);
    }
  },

  // Ensure identifiers are not overwritten on update unless explicitly provided
  async beforeUpdate(event) {
    const { data } = event.params;
    if (!data) return;
    // If update clears identifier or sets it to empty, prevent accidental deletion
    if (Object.prototype.hasOwnProperty.call(data, 'studentIdentifer') && (data.studentIdentifer === null || data.studentIdentifer === '')) {
      delete data.studentIdentifer;
    }
  },
};
