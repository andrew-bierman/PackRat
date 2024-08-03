import { z } from 'zod';
export declare const addTemplate: z.ZodObject<{
    type: z.ZodAny;
    templateId: z.ZodString;
    isGlobalTemplate: z.ZodBoolean;
    createdBy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type?: any;
    templateId?: string;
    isGlobalTemplate?: boolean;
    createdBy?: string;
}, {
    type?: any;
    templateId?: string;
    isGlobalTemplate?: boolean;
    createdBy?: string;
}>;
export declare const editTemplate: z.ZodObject<{
    templateId: z.ZodString;
    type: z.ZodString;
    isGlobalTemplate: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type?: string;
    templateId?: string;
    isGlobalTemplate?: boolean;
}, {
    type?: string;
    templateId?: string;
    isGlobalTemplate?: boolean;
}>;
export declare const deleteTemplate: z.ZodObject<{
    templateId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    templateId?: string;
}, {
    templateId?: string;
}>;
export declare const getTemplateById: z.ZodObject<{
    templateId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    templateId?: string;
}, {
    templateId?: string;
}>;
