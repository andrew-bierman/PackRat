import { z } from 'zod';
export declare const getOsm: z.ZodObject<{
    activityType: z.ZodString;
    startPoint: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        latitude?: number;
        longitude?: number;
    }, {
        latitude?: number;
        longitude?: number;
    }>;
    endPoint: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        latitude?: number;
        longitude?: number;
    }, {
        latitude?: number;
        longitude?: number;
    }>;
}, "strip", z.ZodTypeAny, {
    activityType?: string;
    startPoint?: {
        latitude?: number;
        longitude?: number;
    };
    endPoint?: {
        latitude?: number;
        longitude?: number;
    };
}, {
    activityType?: string;
    startPoint?: {
        latitude?: number;
        longitude?: number;
    };
    endPoint?: {
        latitude?: number;
        longitude?: number;
    };
}>;
export declare const getParksOSM: z.ZodObject<{
    lat: z.ZodNumber;
    lon: z.ZodNumber;
    radius: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    lat?: number;
    lon?: number;
    radius?: number;
}, {
    lat?: number;
    lon?: number;
    radius?: number;
}>;
export declare const getPhotonDetails: z.ZodObject<{
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string | number;
    type?: string;
}, {
    id?: string | number;
    type?: string;
}>;
export declare const getPhotonResults: z.ZodObject<{
    searchString: z.ZodString;
}, "strip", z.ZodTypeAny, {
    searchString?: string;
}, {
    searchString?: string;
}>;
export declare const getTrailsOSM: z.ZodObject<{
    lat: z.ZodNumber;
    lon: z.ZodNumber;
    radius: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    lat?: number;
    lon?: number;
    radius?: number;
}, {
    lat?: number;
    lon?: number;
    radius?: number;
}>;
export declare const postSingleGeoJSON: z.ZodObject<{
    geojson: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    geojson?: any;
}, {
    geojson?: any;
}>;
