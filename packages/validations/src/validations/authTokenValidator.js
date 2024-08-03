import { z } from 'zod';
export const TokenSchema = z.object({
    id: z.string(),
});
export const googleSignin = z.object({
    idToken: z.string().nonempty(),
});
//# sourceMappingURL=authTokenValidator.js.map