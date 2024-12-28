import { publicProcedure } from '../../trpc';
import { z } from 'zod';
import { logoutService as logout } from '../../services/auth/auth.service';
import { TRPCError } from '@trpc/server';

export function logoutRoute() {
  return publicProcedure.input(z.string().min(1)).query(async (opts) => {
    try {
      return await logout(opts.input);
    } catch {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  });
}
