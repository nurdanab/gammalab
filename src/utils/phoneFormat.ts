/**
 * Format phone number to Kazakhstan format: +7 XXX XXX XX XX
 */
export function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');

  // Remove leading 8 or 7 if present (we'll add +7 ourselves)
  let cleanDigits = digits;
  if (cleanDigits.startsWith('8') || cleanDigits.startsWith('7')) {
    cleanDigits = cleanDigits.substring(1);
  }

  // Limit to 10 digits (after +7)
  cleanDigits = cleanDigits.substring(0, 10);

  // Build formatted string
  let formatted = '+7';

  if (cleanDigits.length > 0) {
    formatted += ' ' + cleanDigits.substring(0, 3);
  }
  if (cleanDigits.length > 3) {
    formatted += ' ' + cleanDigits.substring(3, 6);
  }
  if (cleanDigits.length > 6) {
    formatted += ' ' + cleanDigits.substring(6, 8);
  }
  if (cleanDigits.length > 8) {
    formatted += ' ' + cleanDigits.substring(8, 10);
  }

  return formatted;
}

/**
 * Get raw phone number (digits only with country code)
 */
export function getPhoneDigits(formattedPhone: string): string {
  return formattedPhone.replace(/\D/g, '');
}

/**
 * Check if phone number is complete (has all 11 digits including country code)
 */
export function isPhoneComplete(formattedPhone: string): boolean {
  const digits = getPhoneDigits(formattedPhone);
  return digits.length === 11;
}
