import { celebrate, Joi, Segments } from 'celebrate';

/**
 * Creates a Joi validation rule for MongoDB ObjectIds.
 *
 * @param {string} [message="valid id"] - The error message to display if the validation fails.
 * @return {Joi.StringSchema} - The Joi validation rule for MongoDB ObjectIds.
 */
export const JoiObjectId = (message = 'valid id') =>
  Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);

export const getItems = z.object({
  packId: JoiObjectId(),
});

export const getItemById = z.object({
  _id: JoiObjectId(),
});

export const addItem = z.object({
  name: z.string().nonempty(),
  weight: z.string().nonempty(),
  quantity: z.string().nonempty(),
  unit: z.string().nonempty(),
  packId: JoiObjectId(),
  type: z.string().optional(),
  ownerId:z.string().optional(),
});

export const editItem = z.object({
  _id: JoiObjectId(),
  name: z.string().nonempty(),
  weight: z.string().nonempty(),
  quantity: z.string().nonempty(),
  unit: z.string().nonempty(),
  type: z.string(),
});

export const deleteItem = z.object({
  itemId: JoiObjectId().nonempty(),
  packId: JoiObjectId().nonempty(),
});

export const addItemGlobal = z.object({
  name: z.string().nonempty(),
  weight: z.string().nonempty(),
  quantity: z.string().nonempty(),
  unit: z.string().nonempty(),
  type: z.string().optional(),
});
