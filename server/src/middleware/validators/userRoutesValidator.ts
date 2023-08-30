import { z } from "zod";
import { Request } from 'express'

export const JoiObjectId = z.string().regex(/^[0-9a-fA-F]{24}$/g);

export const _testuserSignIn = z.object({
    name: z.string().min(1).nonempty(),
    age: z.number().int().nonnegative(),
    role: z.string().default("admin")
});

export const userSignUp = (req: Request) => zodParser(z.object({
    name: z.string().min(1).nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
    username: z.string().nonempty()
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
export const userSignUp = z.object({
    name: z.string().min(1).nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
});

export const userSignIn = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
});

export const getUserById = z.object({
    userId: JoiObjectId.nonempty(),
});

export const sentEmail = z.object({
    email: z.string().email().nonempty(),
});

export const resetPassword = z.object({
    resetToken: z.string().nonempty(),
    password: z.string().nonempty(),
});

export const addToFavorite = z.object({
    packId: JoiObjectId.nonempty(),
    userId: JoiObjectId.nonempty(),
});

export const editUser = z.object({
    userId: JoiObjectId.nonempty(),
});

export const deleteUser = z.object({
    userId: JoiObjectId.nonempty(),
});

export const linkFirebaseAuth = z.object({
    firebaseAuthToken: z.string().nonempty(),
});

export const createMongoDBUser = z.object({
    email: z.string().email().nonempty(),
    name: z.string().min(1).nonempty(),
    password: z.string().nonempty(),
});

export const getFirebaseUserByEmail = z.object({
    email: z.string().email().nonempty(),
});

export const login = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
});

export const checkCode = z.object({
    email: z.string().email().nonempty(),
    code: z.string().nonempty(),
});

export const emailExists = z.object({
    email: z.string().email().nonempty(),
});

export const updatePassword = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
});