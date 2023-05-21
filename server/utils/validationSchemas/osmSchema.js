import Joi from "joi";

export default {
  getParks: Joi.object().keys({
    activityType: Joi.string().required(),
    startPoint: Joi.number().required(),
    endPoint: Joi.number().required(),
  }),
};
