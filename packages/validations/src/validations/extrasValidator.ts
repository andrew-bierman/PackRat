import { z } from 'zod';

export const AddressArray = z.object({
  addressArray: z.string(),
});

export const handlePasswordReset = z.object({
  token: z.string(),
});
