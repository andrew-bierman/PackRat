import { z } from 'zod';

const ItemSchema = z.object({
  name: z.string(),
  weight: z.number(),
  unit: z.string(),
  quantity: z.number(),
  category: z.enum(['Food', 'Water', 'Essentials']),
});

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
});

const ItemPackSchema = z.object({
  packId: z.string(),
  item: ItemSchema,
});

const TripSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const PackSchema = z.object({
  Items: z
    .array(ItemSchema)
    .describe('This are items that are in the users pack'),
});
