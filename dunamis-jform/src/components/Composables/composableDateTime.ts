/**
 * Returns the current date WITHOUT time
 * @returns {string}
 */
export function dateNow(): string {
  return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

/**
 * Returns the current time WITHOUT date
 * @returns {string}
 */
export function timeNow(): string {
  return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(11, 16);
}

/**
 * Returns the current Date AND Time
 * @returns {string}
 */
export function dateTimeNow(): string {
  return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}

/**
 * Format a Date string separated by '-' or an ISO Date string
 * to a MM/DD/YYYY format.
 * @param {any} date The date to be formatted in ISO or separated by '-'
 * @returns {string | null} Date formatted in MM/DD/YYYY
 */
export function formatDate(date: any): string | null {
  // MM-DD-YYYY format
  if (!date) return null;

  date = date.split('T')[0];
  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}`;
}

/**
 * Parse a Date string separated by '/' to a YYYY-MM-DD format.
 * @param {any} date The date to be parsed into YYYY-MM-DD, separated by '/'
 * @returns {string | null} Date parsed in YYYY-MM-DD
 */
export function parseDate(date: any): string | null {
  // ISO format
  if (!date) return null;

  const [month, day, year] = date.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

/**
 * Format time to be saved the same way it is displayed, adding leading 0's
 * if needed.
 * @param {any} time Time to be formatted, adding leading 0's if needed
 * @returns {string | null} Time formatted to be HH:mm
 */
export function formatTime(time: any): string | null {
  if (!time) return null;
  const [hours, minutes] = time.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}

/**
 * Format Date/Time to be displayed to the user using
 * formatDate and formatTime: MM/DD/YYYY HH:mm
 * @param {any} dt Date/Time to be formatted
 * @returns {string} A datetime string with format: MM/DD/YYYY HH:mm
 */
export function formatDateTime(dt: any): string | null {
  const [d, t] = dt.split(' ').length > 1 ? dt.split(' ') : dt.split('T');
  if (!dt) return null;
  return formatDate(d) + ' ' + formatTime(t);
}

/**
 * Parse a date and time to be saved in ISO format: YYYY-MM-DDTHH:mm:ss.sssZ.
 * Uses parseDate and parseTime
 * @param {any} d Date to be parsed
 * @param {any} t Time to be parsed
 * @returns {string | null} A DateTime string in ISO format
 */
export function parseDateTime(d: any, t: any): string | null {
  if (!d || !t) return null;
  return parseDate(d) + 'T' + formatTime(t) + ':00Z';
}
