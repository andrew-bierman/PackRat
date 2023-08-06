import { celebrate, Joi, Segments } from "celebrate";
import * as userRoutesValidator from "./userRoutesValidator.js";
import * as tripRoutesValidator from "./tripRoutesValidator.js";
import * as packRoutesValidator from "./packRoutesValidator.js";
import * as itemRoutesValidator from "./itemRoutesValidator.js";

export const JoiObjectId = (message = "valid id") =>
  Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);

// export default userRoutesValidator;
export * from "./userRoutesValidator.js";
export * from "./tripRoutesValidator.js";
export * from "./packRoutesValidator.js";
export * from "./itemRoutesValidator.js";
