export const securityHeaders = () => {
  return async (c, next) => {
    // Set various security headers
    c.header(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self'; object-src 'none';",
    );
    c.header('X-Frame-Options', 'DENY');
    c.header('X-Content-Type-Options', 'nosniff');
    c.header('Referrer-Policy', 'no-referrer');
    c.header('Permissions-Policy', 'geolocation=(), microphone=()');
    c.header(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload',
    );
    c.header('X-XSS-Protection', '1; mode=block');

    // Proceed to the next middleware
    return next();
  };
};
