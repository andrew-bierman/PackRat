import { celebrate, Joi, Segments } from 'celebrate'

export const JoiObjectId = (message = 'valid id') => Joi.string().regex(/^[0-9a-fA-F]{24}$/, message)

export const _testuserSignIn = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().integer(),
    role: Joi.string().default('admin')
  }),
  [Segments.QUERY]: {
    token: Joi.string().token().required()
  }
})
export const userSignUp = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  })
})
export const userSignIn = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
})
export const getUserById = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: JoiObjectId().required()
  })
})
export const sentEmail = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required()
  })
})
export const resetPassword = celebrate({
  [Segments.BODY]: Joi.object().keys({
    resetToken: Joi.string().required(),
    password: Joi.string().required()
  })
})
export const addToFavorite = celebrate({
  [Segments.BODY]: Joi.object().keys({
    packId: JoiObjectId().required(),
    userId: JoiObjectId().required()
  })
})
export const editUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    userId: JoiObjectId().required()
  })
})
export const deleteUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    userId: JoiObjectId().required()
  })
})
export const linkFirebaseAuth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    firebaseAuthToken: Joi.string().required()
  })
})
export const createMongoDBUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
  })
})
export const getFirebaseUserByEmail = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required()
  })
})
export const login = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
})
export const checkCode = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    code: Joi.string().required()
  })
})
export const emailExists = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required()
  })
})
export const updatePassword = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
})
