export const enforceHttps = () => {
  return async (c, next) => {
    // Check if the request is already HTTPS or if it's a local development environment
    if (
      c.req.protocol !== 'https' &&
      c.req.headers.get('x-forwarded-proto') !== 'https' &&
      process.env.NODE_ENV !== 'development'
    ) {
      // Construct the HTTPS URL
      const httpsUrl = `https://${c.req.headers.get('host')}${c.req.url}`;
      // Redirect to HTTPS
      return c.redirect(httpsUrl, 301);
    }
    // Proceed with the next middleware if the request is over HTTPS
    return next();
  };
};
