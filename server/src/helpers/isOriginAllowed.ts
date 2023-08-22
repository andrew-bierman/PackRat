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
