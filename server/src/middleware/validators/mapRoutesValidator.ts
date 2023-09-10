import { celebrate, Joi, Segments } from 'celebrate';

/**
 * Creates a Joi validation rule for ObjectId strings.
 *
 * @param {string} [message="valid id"] - The validation error message.
 * @return {Joi.Schema} A Joi validation rule for ObjectId strings.
 */

export const JoiObjectId = (message = 'valid id') =>
  Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);

export const getMaps = celebrate({
  [Segments.BODY]: Joi.object().keys({
    owner_id: JoiObjectId().required(),
  }),
});

export const getMapById = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    mapId: JoiObjectId().required(),
  }),
});

export const addMap = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    geoJSON: Joi.object().required(),
    owner_id: Joi.string().required(),
    is_public: Joi.boolean().required(),
  }),
});

export const editMap = celebrate({
  [Segments.BODY]: Joi.object().keys({
    _id: JoiObjectId().required(),
    name: Joi.string(),
    geoJSON: Joi.object(),
    owner_id: Joi.string(),
    is_public: Joi.boolean(),
  }),
});

export const deleteMap = celebrate({
  [Segments.BODY]: Joi.object().keys({
    mapId: JoiObjectId().required(),
  }),
});
