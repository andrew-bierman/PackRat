import { celebrate, Joi, Segments } from "celebrate";

/**
 * Creates a Joi validation rule for MongoDB ObjectIds.
 *
 * @param {string} [message="valid id"] - The error message to display if the validation fails.
 * @return {Joi.StringSchema} - The Joi validation rule for MongoDB ObjectIds.
 */
export const JoiObjectId = (message = "valid id") =>
  Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);

export const getItems = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    packId: JoiObjectId().required(),
  }),
});
export const getItemById = celebrate({
  [Segments.BODY]: Joi.object().keys({
    _id: JoiObjectId().required(),
  }),
});
export const addItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    weight: Joi.string().required(),
    quantity: Joi.string().required(),
    unit: Joi.string().required(),
    packId: JoiObjectId().required(),
    type: Joi.string().optional(),
  }),
});
export const editItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    _id: JoiObjectId().required(),
    name: Joi.string(),
    weight: Joi.string(),
    quantity: Joi.string(),
    unit: Joi.string(),
    type: Joi.string(),
  }),
});
export const deleteItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    itemId: JoiObjectId().required(),
    packId: JoiObjectId(),
  }),
});

export const addItemGlobal = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    weight: Joi.string().required(),
    quantity: Joi.string().required(),
    unit: Joi.string().required(),
    type: Joi.string().optional(),
  }),
});
