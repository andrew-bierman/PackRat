import { z } from 'zod';

export const TokenSchema = z.object({
  _id: z.string(),
});

export const googleSignin = z.object({
  idToken: z.string().nonempty(),
});
