import { z, ZodSchema } from "zod";
import { Request } from 'express'

export const JoiObjectId = (message = "valid id") =>
    z.string().regex(/^[0-9a-fA-F]{24}$/g, { message });

export const _testuserSignIn = (req: Request) => {
    zodParser(z.object({
        name: z.string().min(1).nonempty(),
        age: z.number().int().nonnegative(),
        role: z.string().default("admin"),
    }), req.body)
    zodParser(z.object({
        token: z.string().nonempty(),
    }), req.query)
}

export const userSignUp = (req: Request) => zodParser(z.object({
    name: z.string().min(1).nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
}), req.body)

export const userSignIn = (req: Request) => zodParser(z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
}), req.body)

export const getUserById = (req: Request) => zodParser(z.object({
    userId: JoiObjectId(),
}), req.params)

export const sentEmail = (req: Request) => zodParser(z.object({
    email: z.string().email().nonempty(),
}), req.body)

export const resetPassword = (req: Request) => zodParser(z.object({
    resetToken: z.string().nonempty(),
    password: z.string().nonempty(),
}), req.body)

export const addToFavorite = (req: Request) => zodParser(z.object({
    packId: JoiObjectId(),
    userId: JoiObjectId(),
}), req.body)

export const editUser = (req: Request) => zodParser(z.object({
    userId: JoiObjectId(),
}), req.body)

export const deleteUser = (req: Request) => zodParser(z.object({
    userId: JoiObjectId(),
}), req.body)

export const linkFirebaseAuth = (req: Request) => zodParser(
    z.object({
        firebaseAuthToken: z.string().nonempty(),
    }), req.body)

export const createMongoDBUser = (req: Request) => zodParser(z.object({
    email: z.string().email().nonempty(),
    name: z.string().min(1).nonempty(),
    password: z.string().nonempty(),
}), req.body)

export const getFirebaseUserByEmail = (req: Request) => zodParser(z.object({
    email: z.string().email().nonempty(),
}), req.body)

export const login = (req: Request) => zodParser(z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
}), req.body)

export const checkCode = (req: Request) => zodParser(
    z.object({
        email: z.string().email().nonempty(),
        code: z.string().nonempty(),
    }),
    req.body
)

export const emailExists = (req: Request) => zodParser(z.object({
    email: z.string().email().nonempty(),
}), req.body)

export const updatePassword = (req: Request) => zodParser(z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
}), req.body);

function zodParser(schema: ZodSchema, input: any) {
    schema.parse(input)
}