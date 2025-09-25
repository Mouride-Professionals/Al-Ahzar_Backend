"use strict";

/**
 * Centralized student identifier generator
 * Format: AZ + last-two-digits-of-year + 5 random characters from 0-9,A-Z
 */

// Use a charset that avoids ambiguous characters (no 0,O,1,I,L)
const CHARS = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

function randomChars(length = 6) {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return out;
}

async function generateUniqueIdentifier(strapi, maxAttempts = 200) {
  const year = new Date().getFullYear() % 100; // last two digits
  const yearStr = String(year).padStart(2, '0');
  const prefix = `AZ${yearStr}`;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = `${prefix}${randomChars(6)}`; // 6 random chars

    // Use low-level db query for efficient existence check
    const existing = await strapi.db.query('api::student.student').findOne({ where: { studentIdentifer: candidate } });
    if (!existing) {
      return candidate;
    }
  }

  throw new Error('Unable to generate a unique student identifier after many attempts');
}

module.exports = {
  generateUniqueIdentifier,
};
