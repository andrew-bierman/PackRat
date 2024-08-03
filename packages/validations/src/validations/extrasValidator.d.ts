import { z } from 'zod';
export declare const AddressArray: z.ZodObject<{
    addressArray: z.ZodString;
}, "strip", z.ZodTypeAny, {
    addressArray?: string;
}, {
    addressArray?: string;
}>;
export declare const handlePasswordReset: z.ZodObject<{
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token?: string;
}, {
    token?: string;
}>;
