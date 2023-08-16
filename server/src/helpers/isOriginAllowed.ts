export const isOriginAllowed = (origin: string, allowedOrigin: string) => {
    const originDomain = new URL(origin).hostname;
    const allowedOriginDomain = new URL(allowedOrigin).hostname;
    const allowedOriginRegex = new RegExp(`^(packrat-pr-\\d+\.onrender\.com|${allowedOriginDomain.replace(/\./g, '\\.')})$`);
    
    return allowedOriginRegex.test(originDomain);
  };
  