import { z } from 'zod';
import { PackAndItemVisibilityFilter } from '@packrat/shared-types';
export declare const getPacks: z.ZodObject<{
    ownerId: z.ZodString;
    queryBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    ownerId?: string;
    queryBy?: string;
}, {
    ownerId?: string;
    queryBy?: string;
}>;
export declare const getPackById: z.ZodObject<{
    packId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    packId?: string;
}, {
    packId?: string;
}>;
export declare const addPack: z.ZodObject<{
    name: z.ZodString;
    owner_id: z.ZodString;
    is_public: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    name?: string;
    owner_id?: string;
    is_public?: boolean;
}, {
    name?: string;
    owner_id?: string;
    is_public?: boolean;
}>;
export declare const editPack: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    is_public: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    is_public?: boolean;
}, {
    id?: string;
    name?: string;
    is_public?: boolean;
}>;
export declare const deletePack: z.ZodObject<{
    packId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    packId?: string;
}, {
    packId?: string;
}>;
export declare const getPublicPacks: z.ZodObject<{
    queryBy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    queryBy?: string;
}, {
    queryBy?: string;
}>;
export declare const sendMessage: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message?: string;
}, {
    message?: string;
}>;
export declare const addPackSchema: z.ZodObject<{
    name: z.ZodString;
    isPublic: z.ZodUnion<[z.ZodLiteral<"0">, z.ZodLiteral<"1">]>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    isPublic?: "1" | "0";
}, {
    name?: string;
    isPublic?: "1" | "0";
}>;
export declare const duplicatePublicPack: z.ZodObject<{
    packId: z.ZodString;
    ownerId: z.ZodString;
    items: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    packId?: string;
    ownerId?: string;
    items?: string[];
}, {
    packId?: string;
    ownerId?: string;
    items?: string[];
}>;
export declare const getSimilarPacks: z.ZodObject<{
    id: z.ZodString;
    limit: z.ZodNumber;
    visibility: z.ZodDefault<z.ZodNativeEnum<typeof PackAndItemVisibilityFilter>>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    limit?: number;
    visibility?: PackAndItemVisibilityFilter;
}, {
    id?: string;
    limit?: number;
    visibility?: PackAndItemVisibilityFilter;
}>;
