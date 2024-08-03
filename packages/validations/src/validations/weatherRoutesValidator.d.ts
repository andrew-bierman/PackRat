import { z } from 'zod';
export declare const getWeatherWeek: z.ZodObject<{
    lat: z.ZodNumber;
    lon: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    lat?: number;
    lon?: number;
}, {
    lat?: number;
    lon?: number;
}>;
export declare const getWeather: z.ZodObject<{
    lat: z.ZodNumber;
    lon: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    lat?: number;
    lon?: number;
}, {
    lat?: number;
    lon?: number;
}>;
