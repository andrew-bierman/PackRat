import { PackAndItemVisibilityFilter } from '@packrat/shared-types';
import { z } from 'zod';
export declare const getItemByName: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>;
export declare const getItems: z.ZodObject<{
    packId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    packId?: string;
}, {
    packId?: string;
}>;
export declare const getItemById: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
}, {
    id?: string;
}>;
export declare const addItem: z.ZodObject<{
    name: z.ZodString;
    weight: z.ZodNumber;
    quantity: z.ZodNumber;
    unit: z.ZodString;
    packId: z.ZodString;
    type: z.ZodString;
    ownerId: z.ZodString;
    id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    type?: string;
    packId?: string;
    weight?: number;
    quantity?: number;
    unit?: string;
    ownerId?: string;
}, {
    id?: string;
    name?: string;
    type?: string;
    packId?: string;
    weight?: number;
    quantity?: number;
    unit?: string;
    ownerId?: string;
}>;
export declare const importItem: z.ZodObject<{
    content: z.ZodString;
    packId: z.ZodString;
    ownerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    packId?: string;
    ownerId?: string;
    content?: string;
}, {
    packId?: string;
    ownerId?: string;
    content?: string;
}>;
export type Item = z.infer<typeof addItem>;
export declare const editItem: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    weight: z.ZodNumber;
    quantity: z.ZodNumber;
    unit: z.ZodString;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    type?: string;
    weight?: number;
    quantity?: number;
    unit?: string;
}, {
    id?: string;
    name?: string;
    type?: string;
    weight?: number;
    quantity?: number;
    unit?: string;
}>;
export declare const addGlobalItemToPack: z.ZodObject<{
    packId: z.ZodString;
    itemId: z.ZodString;
    ownerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    packId?: string;
    ownerId?: string;
    itemId?: string;
}, {
    packId?: string;
    ownerId?: string;
    itemId?: string;
}>;
export declare const deleteGlobalItem: z.ZodObject<{
    itemId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    itemId?: string;
}, {
    itemId?: string;
}>;
export declare const editGlobalItemAsDuplicate: z.ZodObject<{
    itemId: z.ZodString;
    packId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    packId?: string;
    itemId?: string;
}, {
    packId?: string;
    itemId?: string;
}>;
export declare const deleteItem: z.ZodObject<{
    itemId: z.ZodString;
    packId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    packId?: string;
    itemId?: string;
}, {
    packId?: string;
    itemId?: string;
}>;
export declare const addItemGlobal: z.ZodObject<{
    name: z.ZodString;
    weight: z.ZodNumber;
    quantity: z.ZodNumber;
    unit: z.ZodString;
    type: z.ZodString;
    ownerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    type?: string;
    weight?: number;
    quantity?: number;
    unit?: string;
    ownerId?: string;
}, {
    name?: string;
    type?: string;
    weight?: number;
    quantity?: number;
    unit?: string;
    ownerId?: string;
}>;
export declare const importItemsGlobal: z.ZodObject<{
    content: z.ZodString;
    ownerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ownerId?: string;
    content?: string;
}, {
    ownerId?: string;
    content?: string;
}>;
export declare const getItemsGlobally: z.ZodObject<{
    limit: z.ZodNumber;
    page: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    limit?: number;
    page?: number;
}, {
    limit?: number;
    page?: number;
}>;
export declare const getSimilarItems: z.ZodObject<{
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
export declare const importItemHeaders: z.ZodObject<{
    Name: z.ZodString;
    Weight: z.ZodString;
    Unit: z.ZodString;
    Quantity: z.ZodString;
    Category: z.ZodString;
}, "strip", z.ZodTypeAny, {
    Name?: string;
    Weight?: string;
    Unit?: string;
    Quantity?: string;
    Category?: string;
}, {
    Name?: string;
    Weight?: string;
    Unit?: string;
    Quantity?: string;
    Category?: string;
}>;
export type ImportItemHeaders = z.infer<typeof importItemHeaders>;
