import { z } from 'zod';
export declare const getAIResponse: z.ZodObject<{
    userId: z.ZodString;
    itemTypeId: z.ZodString;
    userInput: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId?: string;
    itemTypeId?: string;
    userInput?: string;
}, {
    userId?: string;
    itemTypeId?: string;
    userInput?: string;
}>;
export declare const getUserChats: z.ZodObject<{
    userId: z.ZodString;
    itemTypeId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId?: string;
    itemTypeId?: string;
}, {
    userId?: string;
    itemTypeId?: string;
}>;
export declare const getAISuggestions: z.ZodObject<{
    userId: z.ZodString;
    itemTypeId: z.ZodString;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId?: string;
    type?: string;
    itemTypeId?: string;
}, {
    userId?: string;
    type?: string;
    itemTypeId?: string;
}>;
