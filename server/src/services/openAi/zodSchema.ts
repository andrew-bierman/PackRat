import { z } from 'zod';

const ItemSchema = z
  .object({
    name: z.string().describe('The name of the item'),
    weight: z.number().describe('The weight of the item'),
    quantity: z.number().describe('The quantity of the item'),
    unit: z.string().describe('The unit of measurement for the item'),
    category: z.string().describe('The category the item belongs to'),
    owners: z
      .array(z.string())
      .default([])
      .describe('An array of user IDs who own the item'),
    packs: z
      .array(z.string())
      .default([])
      .describe('An array of pack IDs where the item is included'),
    global: z
      .boolean()
      .default(false)
      .describe(
        'A boolean indicating whether the item is globally accessible or not',
      ),
  })
  .describe(
    'A detailed schema for an item, including its properties and associations',
  );

const PackSchema = z
  .object({
    name: z.string().describe('The name of the pack'),
    items: z.array(z.string()).describe('An array of items in the pack'),
    owner_id: z.string().describe('The ID of the owner of the pack'),
    is_public: z
      .boolean()
      .describe('A boolean indicating whether the pack is public or not'),
    favorited_by: z
      .number()
      .describe('The number of users who have favorited the pack'),
    createdAt: z.string().describe('The creation date of the pack'),
    grades: z
      .object({
        weight: z.string().default('').describe('The weight grade of the pack'),
        essentialItems: z
          .string()
          .default('')
          .describe('The essential items grade of the pack'),
        redundancyAndVersatility: z
          .string()
          .default('')
          .describe('The redundancy and versatility grade of the pack'),
      })
      .describe(
        'An object containing the grades assigned to the pack based on various factors',
      ),
    scores: z
      .object({
        weightScore: z
          .number()
          .default(0)
          .describe(
            'The score calculated based on the total weight of the pack',
          ),
        essentialItemsScore: z
          .number()
          .default(0)
          .describe(
            'The score calculated based on the essential items in the pack',
          ),
        redundancyAndVersatilityScore: z
          .number()
          .default(0)
          .describe(
            'The score calculated based on the redundancy and versatility of items in the pack',
          ),
      })
      .describe(
        'An object containing the scores calculated for the pack based on various factors',
      ),
  })
  .describe(
    'A detailed available data of a users pack, including its properties, grades, and scores',
  );

// define for trip and items as well

export { PackSchema, ItemSchema };
