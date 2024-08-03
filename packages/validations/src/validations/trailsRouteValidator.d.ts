import { z } from 'zod';
export declare const getTrails: z.ZodObject<{
    administrative_area_level_1: z.ZodString;
    country: z.ZodString;
    locality: z.ZodString;
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    latitude?: number;
    longitude?: number;
    administrative_area_level_1?: string;
    country?: string;
    locality?: string;
}, {
    latitude?: number;
    longitude?: number;
    administrative_area_level_1?: string;
    country?: string;
    locality?: string;
}>;
