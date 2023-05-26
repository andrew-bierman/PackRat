import { celebrate, Joi, Segments } from "celebrate";

export const JoiObjectId = (message = 'valid id') => Joi.string().regex(/^[0-9a-fA-F]{24}$/, message)

export const getPacks = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        ownerId: JoiObjectId().required(),
    }),
});
export const getPackById = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        packId: JoiObjectId().required(),
    }),
});
export const addPack = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        owner_id: JoiObjectId().required(),
        is_public: Joi.boolean(),
    }),
});
export const editPack = celebrate({
    [Segments.BODY]: Joi.object().keys({
        _id: JoiObjectId().required(),
        name: Joi.string(),
        is_public: Joi.boolean(),
    }),
});
export const deletePack = celebrate({
    [Segments.BODY]: Joi.object().keys({
        packId: JoiObjectId().required(),
    }),
});