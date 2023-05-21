import Joi from "joi";

export default {
  checkCode: Joi.object().keys({
    email: Joi.string().email().required(),
    code: Joi.string().required(),
  }),
  emailExists: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
  updatePassword: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
