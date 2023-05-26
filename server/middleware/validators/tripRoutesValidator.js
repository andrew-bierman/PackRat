import { celebrate, Joi, Segments } from "celebrate";

export const JoiObjectId = (message = 'valid id') => Joi.string().regex(/^[0-9a-fA-F]{24}$/, message)

export const getTrips = celebrate({
    [Segments.BODY]: Joi.object().keys({
        owner_id: JoiObjectId().required(),
    }),
});
export const getTripById = celebrate({
    [Segments.BODY]: Joi.object().keys({
        tripId: JoiObjectId().required(),
    }),
});
export const addTrip = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        duration: Joi.string().required(),
        weather: Joi.string().required(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
        destination: Joi.string().required(),
        owner_id: Joi.string().required(),
        is_public: Joi.boolean(),
    }),
});
export const editTrip = celebrate({
    [Segments.BODY]: Joi.object().keys({
        _id: JoiObjectId().required(),
        name: Joi.string(),
        duration: Joi.string(),
        weather: Joi.string(),
        start_date: Joi.string(),
        end_date: Joi.string(),
        destination: Joi.string(),
        is_public: Joi.boolean(),
    }),
});
export const deleteTrip = celebrate({
    [Segments.BODY]: Joi.object().keys({
        tripId: JoiObjectId().required(),
    }),
});