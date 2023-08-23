/**
 * Checks if the given origin is allowed based on the allowed origin.
 *
 * @param {string} origin - The origin to be checked.
 * @param {string} allowedOrigin - The allowed origin.
 * @return {boolean} Returns true if the origin is allowed, otherwise false.
 */
export const isOriginAllowed = (origin: string, allowedOrigin: string) => {
  const originDomain = new URL(origin).hostname;
  const allowedOriginDomain = new URL(allowedOrigin).hostname;

  // Patterns for different domain structures.
  const packratPattern = 'packrat-pr-\\d+\\.onrender\\.com';
  const packratDevPattern = 'packrat-dev-qj5h-pr-\\d+\\.onrender\\.com';
  const allowedPattern = allowedOriginDomain.replace(/\./g, '\\.');

  // Construct the final regex using the patterns.
  const allowedOriginRegex = new RegExp(`^(${packratPattern}|${packratDevPattern}|${allowedPattern})$`);

  return allowedOriginRegex.test(originDomain);
};
