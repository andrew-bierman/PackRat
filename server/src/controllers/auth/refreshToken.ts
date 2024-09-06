import { protectedProcedure, publicProcedure } from 'src/trpc';
import { z } from 'zod';
import { refreshTokenService } from 'src/services/user/user.service';
import { TRPCError } from '@trpc/server';

export function refreshTokenRoute() {
  return publicProcedure.input(z.string().min(1)).query(async (opts) => {
    try {
      return await refreshTokenService(
        opts.ctx.env.JWT_SECRET,
        opts.ctx.env.REFRESH_TOKEN_SECRET,
        opts.input,
      );
    } catch (error) {
      // Refresh token expires
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
  });
}
