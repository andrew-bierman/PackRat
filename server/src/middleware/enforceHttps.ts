export const enforceHttps = () => {
  return async (c, next) => {
    // Determine protocol and x-forwarded-proto header values
    const protocol = c.req.protocol;
    let xForwardedProto;
    if (c.req.headers instanceof Headers) {
      // If c.req.headers is a Headers object
      xForwardedProto = c.req.headers.get('x-forwarded-proto');
    } else if (typeof c.req.headers === 'object') {
      // If c.req.headers is a plain object
      xForwardedProto = c.req.headers['x-forwarded-proto'];
    }

    // Check if the request is already HTTPS or if it's a local development environment
    if (
      protocol !== 'https' &&
      xForwardedProto !== 'https' &&
      process.env.NODE_ENV !== 'development'
    ) {
      // Construct the HTTPS URL
      const host =
        c.req.headers instanceof Headers
          ? c.req.headers.get('host')
          : c.req.headers.host;
      const httpsUrl = `https://${host}${c.req.url}`;
      // Redirect to HTTPS
      return c.redirect(httpsUrl, 301);
    }

    return next();
  };
};
