export function tryCatchWrapper(fn) {
  return async (c, next) => {
    try {
      await fn(c, next);
    } catch (error) {
      next(error);
    }
  };
}
