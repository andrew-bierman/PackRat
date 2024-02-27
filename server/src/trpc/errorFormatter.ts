import { ZodError } from 'zod';

/**
 * Create error formatter to handle Zod errors
 */
export const errorFormatter = (opts) => {
  const { shape, error } = opts;
  return {
    ...shape,
    data: {
      ...shape.data,
      zodError:
        error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
          ? error.cause.flatten()
          : null,
    },
  };
};
