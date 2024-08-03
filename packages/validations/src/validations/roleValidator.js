import { z } from 'zod';
export const RoleSchema = z.union([z.literal('user'), z.literal('admin')]);
//# sourceMappingURL=roleValidator.js.map