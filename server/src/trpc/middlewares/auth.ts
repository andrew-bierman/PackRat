import { TRPCError } from '@trpc/server';
// import { middleware } from '..';

/**
 * Middleware to check if the user has a certain role.
 * @param {object} opts - tRPC request options object.
 * @returns {Function} - tRPC middleware function.
 */
const auth = async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx,
  });
};

export default auth;
