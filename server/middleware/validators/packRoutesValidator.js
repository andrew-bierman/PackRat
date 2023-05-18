import { celebrate, Joi, Segments } from "celebrate";

export const JoiObjectId = (message = 'valid id') => Joi.string().regex(/^[0-9a-fA-F]{24}$/, message)

export const getPacks = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        owner_id: JoiObjectId().required(),
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
    }),
});
export const editPack = celebrate({
    [Segments.BODY]: Joi.object().keys({
        _id: JoiObjectId().required(),
    }),
});
export const deletePack = celebrate({
    [Segments.BODY]: Joi.object().keys({
        packId: JoiObjectId().required(),
    }),
});