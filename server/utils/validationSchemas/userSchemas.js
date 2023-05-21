import Joi from "joi";

export default  {
  getUserById: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  createMongoDBUser: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  addToFavorite: Joi.object().keys({
    userId: Joi.string().required(),
    packId: Joi.string().required(),
  }),
};
