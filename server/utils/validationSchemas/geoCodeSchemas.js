import Joi from "joi";

export default {
  getGeoCode: Joi.object().keys({
    addressAray: Joi.string().required(),
  }),
};
