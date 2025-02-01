/**
 * Transforms an insecure URL into a secure HTTPS URL.
 *
 * This function ensures that any provided URL uses HTTPS by:
 * - Converting protocol-relative URLs (starting with '//') to HTTPS
 * - Converting HTTP URLs to HTTPS
 * - Preserving existing HTTPS URLs and other URL formats
 *
 * @param {string} [url] - The URL to be transformed
 * @returns {string | undefined} The secure HTTPS URL, or undefined if no URL was provided
 * @example
 *
 * toSecureUrl('//example.com');     // Returns 'https://example.com'
 * toSecureUrl('http://example.com'); // Returns 'https://example.com'
 * toSecureUrl('https://example.com'); // Returns 'https://example.com'
 * toSecureUrl();                    // Returns undefined
 */
export const toSecureUrl = (url?: string): string | undefined => {
  if (!url) {
    return undefined;
  }

  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('http:')) {
    return url.replace('http:', 'https:');
  }

  return url;
};
