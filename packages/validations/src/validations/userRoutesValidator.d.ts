import { z } from 'zod';
export declare const userSignUp: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEffects<z.ZodString, string, string>;
    password: z.ZodEffects<z.ZodString, string, string>;
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    password?: string;
    email?: string;
    username?: string;
}, {
    name?: string;
    password?: string;
    email?: string;
    username?: string;
}>;
export declare const userSignIn: z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, string>;
    password: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    password?: string;
    email?: string;
}, {
    password?: string;
    email?: string;
}>;
export declare const sentEmail: z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    email?: string;
}, {
    email?: string;
}>;
export declare const resetPassword: z.ZodObject<{
    resetToken: z.ZodString;
    password: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    password?: string;
    resetToken?: string;
}, {
    password?: string;
    resetToken?: string;
}>;
export declare const getFirebaseUserByEmail: z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    email?: string;
}, {
    email?: string;
}>;
export declare const checkCode: z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, string>;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    code?: string;
}, {
    email?: string;
    code?: string;
}>;
export declare const emailExists: z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    email?: string;
}, {
    email?: string;
}>;
export declare const getUserById: z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId?: string;
}, {
    userId?: string;
}>;
export declare const addToFavorite: z.ZodObject<{
    packId: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId?: string;
    packId?: string;
}, {
    userId?: string;
    packId?: string;
}>;
export declare const editUser: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    email: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["user", "admin"]>>;
    username: z.ZodOptional<z.ZodString>;
    offlineMaps: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        name: z.ZodString;
        styleURL: z.ZodString;
        metadata: z.ZodObject<{
            shape: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            shape?: string;
        }, {
            shape?: string;
        }>;
        bounds: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
        minZoom: z.ZodNumber;
        maxZoom: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        metadata?: {
            shape?: string;
        };
        name?: string;
        styleURL?: string;
        bounds?: number[][];
        minZoom?: number;
        maxZoom?: number;
    }, {
        metadata?: {
            shape?: string;
        };
        name?: string;
        styleURL?: string;
        bounds?: number[][];
        minZoom?: number;
        maxZoom?: number;
    }>>>>;
    profileImage: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    preferredWeather: z.ZodOptional<z.ZodString>;
    preferredWeight: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    password?: string;
    email?: string;
    code?: string;
    offlineMaps?: Record<string, {
        metadata?: {
            shape?: string;
        };
        name?: string;
        styleURL?: string;
        bounds?: number[][];
        minZoom?: number;
        maxZoom?: number;
    }>;
    role?: "user" | "admin";
    username?: string;
    profileImage?: string;
    preferredWeather?: string;
    preferredWeight?: string;
}, {
    id?: string;
    name?: string;
    password?: string;
    email?: string;
    code?: string;
    offlineMaps?: Record<string, {
        metadata?: {
            shape?: string;
        };
        name?: string;
        styleURL?: string;
        bounds?: number[][];
        minZoom?: number;
        maxZoom?: number;
    }>;
    role?: "user" | "admin";
    username?: string;
    profileImage?: string;
    preferredWeather?: string;
    preferredWeight?: string;
}>;
export declare const deleteUser: z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId?: string;
}, {
    userId?: string;
}>;
export declare const deleteUserForm: z.ZodObject<{
    confirmText: z.ZodLiteral<"delete">;
}, "strip", z.ZodTypeAny, {
    confirmText?: "delete";
}, {
    confirmText?: "delete";
}>;
export declare const linkFirebaseAuth: z.ZodObject<{
    firebaseAuthToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    firebaseAuthToken?: string;
}, {
    firebaseAuthToken?: string;
}>;
export declare const createMongoDBUser: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    password?: string;
    email?: string;
}, {
    name?: string;
    password?: string;
    email?: string;
}>;
export declare const login: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    password?: string;
    email?: string;
}, {
    password?: string;
    email?: string;
}>;
export declare const updatePassword: z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, string>;
    password: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    password?: string;
    email?: string;
}, {
    password?: string;
    email?: string;
}>;
export declare const userSettingsSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEffects<z.ZodString, string, string>;
    username: z.ZodString;
    profileImage: z.ZodOptional<z.ZodString>;
    preferredWeather: z.ZodUnion<[z.ZodLiteral<"celsius">, z.ZodLiteral<"fahrenheit">]>;
    preferredWeight: z.ZodUnion<[z.ZodLiteral<"lb">, z.ZodLiteral<"oz">, z.ZodLiteral<"kg">, z.ZodLiteral<"g">]>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    email?: string;
    username?: string;
    profileImage?: string;
    preferredWeather?: "celsius" | "fahrenheit";
    preferredWeight?: "lb" | "g" | "kg" | "oz";
}, {
    name?: string;
    email?: string;
    username?: string;
    profileImage?: string;
    preferredWeather?: "celsius" | "fahrenheit";
    preferredWeight?: "lb" | "g" | "kg" | "oz";
}>;
export declare const passwordChangeSchema: z.ZodEffects<z.ZodObject<{
    oldPassword: z.ZodEffects<z.ZodString, string, string>;
    newPassword: z.ZodEffects<z.ZodString, string, string>;
    confirmPassword: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}, {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}>, {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}, {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}>;
