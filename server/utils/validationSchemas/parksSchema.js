import Joi from "joi";

export default {
  getParks: Joi.object().keys({
    abbrState: Joi.string().required(),
  }),
};
