import { z } from 'zod';

const JoiObjectId = z.string().regex(/^[0-9a-fA-F]{24}$/g);

export const AddressArray = z.object({
  addressArray: z.string(),
});

export const handlePasswordReset = z.object({
  token: z.string(),
});
