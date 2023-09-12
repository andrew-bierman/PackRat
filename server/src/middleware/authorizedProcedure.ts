import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../trpc';
import { RoleSchema } from '@packrat/packages';

export const authorizedProcedure = publicProcedure.use(
    middleware(async (opts) => {
        console.log(`User ${opts.ctx?.user?.email} is requesting path: ${opts.path}`);

        if (!opts.ctx.user.id) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        const allowedRoles = ["admin", "user"];

        if (opts.path !== "getUsers") {
            RoleSchema.parse(opts.ctx.user.role);

            if (!allowedRoles.includes(opts.ctx.user.role)) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
        } else {
            const adminRole = "admin";
            RoleSchema.parse(adminRole);

            if (opts.ctx.user.role !== adminRole) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
        }

        try {
            const start = Date.now();
            const result = await opts.next();
            const durationMs = Date.now() - start;

            result.ok
                ? console.log('OK request timing:', { path: opts.path, type: opts.type, durationMs })
                : console.error('Non-OK request timing', { path: opts.path, type: opts.type, durationMs });

            return result;
        } catch (err) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
    })
);