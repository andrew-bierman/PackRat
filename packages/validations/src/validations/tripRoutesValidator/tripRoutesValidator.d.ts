import { z } from 'zod';
export declare const addTripForm: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    is_public: z.ZodUnion<[z.ZodLiteral<"0">, z.ZodLiteral<"1">]>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    is_public?: "1" | "0";
    description?: string;
}, {
    name?: string;
    is_public?: "1" | "0";
    description?: string;
}>;
export declare const getTrips: z.ZodObject<{
    owner_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    owner_id?: string;
}, {
    owner_id?: string;
}>;
export declare const getTripById: z.ZodObject<{
    tripId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tripId?: string;
}, {
    tripId?: string;
}>;
export declare const addTripDetails: z.ZodObject<{
    duration: z.ZodString;
    start_date: z.ZodString;
    end_date: z.ZodString;
    destination: z.ZodString;
    type: z.ZodEnum<[string, ...string[]]>;
    park: z.ZodOptional<z.ZodString>;
    trail: z.ZodOptional<z.ZodString>;
    geoJSON: z.ZodObject<{
        type: z.ZodLiteral<"FeatureCollection">;
        features: z.ZodArray<z.ZodObject<{
            type: z.ZodLiteral<"Feature">;
            id: z.ZodString;
            properties: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            geometry: z.ZodUnion<[z.ZodObject<{
                type: z.ZodString;
                coordinates: any;
            }, "strip", z.ZodTypeAny, {
                type?: string;
                coordinates?: any;
            }, {
                type?: string;
                coordinates?: any;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"GeometryCollection">;
                geometries: z.ZodArray<z.ZodObject<{
                    type: z.ZodString;
                    coordinates: any;
                }, "strip", z.ZodTypeAny, {
                    type?: string;
                    coordinates?: any;
                }, {
                    type?: string;
                    coordinates?: any;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            }, {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            }>]>;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            type?: "Feature";
            properties?: Record<string, string | number | boolean>;
            geometry?: {
                type?: string;
                coordinates?: any;
            } | {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            };
        }, {
            id?: string;
            type?: "Feature";
            properties?: Record<string, string | number | boolean>;
            geometry?: {
                type?: string;
                coordinates?: any;
            } | {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            };
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type?: "FeatureCollection";
        features?: {
            id?: string;
            type?: "Feature";
            properties?: Record<string, string | number | boolean>;
            geometry?: {
                type?: string;
                coordinates?: any;
            } | {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            };
        }[];
    }, {
        type?: "FeatureCollection";
        features?: {
            id?: string;
            type?: "Feature";
            properties?: Record<string, string | number | boolean>;
            geometry?: {
                type?: string;
                coordinates?: any;
            } | {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            };
        }[];
    }>;
    owner_id: z.ZodString;
    pack_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    pack_id?: string;
    owner_id?: string;
    type?: string;
    duration?: string;
    start_date?: string;
    end_date?: string;
    destination?: string;
    geoJSON?: {
        type?: "FeatureCollection";
        features?: {
            id?: string;
            type?: "Feature";
            properties?: Record<string, string | number | boolean>;
            geometry?: {
                type?: string;
                coordinates?: any;
            } | {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            };
        }[];
    };
    park?: string;
    trail?: string;
}, {
    pack_id?: string;
    owner_id?: string;
    type?: string;
    duration?: string;
    start_date?: string;
    end_date?: string;
    destination?: string;
    geoJSON?: {
        type?: "FeatureCollection";
        features?: {
            id?: string;
            type?: "Feature";
            properties?: Record<string, string | number | boolean>;
            geometry?: {
                type?: string;
                coordinates?: any;
            } | {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            };
        }[];
    };
    park?: string;
    trail?: string;
}>;
export declare const addTrip: z.ZodObject<z.objectUtil.extendShape<{
    duration: z.ZodString;
    start_date: z.ZodString;
    end_date: z.ZodString;
    destination: z.ZodString;
    type: z.ZodEnum<[string, ...string[]]>;
    park: z.ZodOptional<z.ZodString>;
    trail: z.ZodOptional<z.ZodString>;
    geoJSON: z.ZodObject<{
        type: z.ZodLiteral<"FeatureCollection">;
        features: z.ZodArray<z.ZodObject<{
            type: z.ZodLiteral<"Feature">;
            id: z.ZodString;
            properties: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            geometry: z.ZodUnion<[z.ZodObject<{
                type: z.ZodString;
                coordinates: any;
            }, "strip", z.ZodTypeAny, {
                type?: string;
                coordinates?: any;
            }, {
                type?: string;
                coordinates?: any;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"GeometryCollection">;
                geometries: z.ZodArray<z.ZodObject<{
                    type: z.ZodString;
                    coordinates: any;
                }, "strip", z.ZodTypeAny, {
                    type?: string;
                    coordinates?: any;
                }, {
                    type?: string;
                    coordinates?: any;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            }, {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            }>]>;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            type?: "Feature";
            properties?: Record<string, string | number | boolean>;
            geometry?: {
                type?: string;
                coordinates?: any;
            } | {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            };
        }, {
            id?: string;
            type?: "Feature";
            properties?: Record<string, string | number | boolean>;
            geometry?: {
                type?: string;
                coordinates?: any;
            } | {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            };
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type?: "FeatureCollection";
        features?: {
            id?: string;
            type?: "Feature";
            properties?: Record<string, string | number | boolean>;
            geometry?: {
                type?: string;
                coordinates?: any;
            } | {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            };
        }[];
    }, {
        type?: "FeatureCollection";
        features?: {
            id?: string;
            type?: "Feature";
            properties?: Record<string, string | number | boolean>;
            geometry?: {
                type?: string;
                coordinates?: any;
            } | {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            };
        }[];
    }>;
    owner_id: z.ZodString;
    pack_id: z.ZodString;
}, {
    name: z.ZodString;
    description: z.ZodString;
    is_public: z.ZodUnion<[z.ZodLiteral<"0">, z.ZodLiteral<"1">]>;
}>, "strip", z.ZodTypeAny, {
    name?: string;
    pack_id?: string;
    owner_id?: string;
    is_public?: "1" | "0";
    type?: string;
    description?: string;
    duration?: string;
    start_date?: string;
    end_date?: string;
    destination?: string;
    geoJSON?: {
        type?: "FeatureCollection";
        features?: {
            id?: string;
            type?: "Feature";
            properties?: Record<string, string | number | boolean>;
            geometry?: {
                type?: string;
                coordinates?: any;
            } | {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            };
        }[];
    };
    park?: string;
    trail?: string;
}, {
    name?: string;
    pack_id?: string;
    owner_id?: string;
    is_public?: "1" | "0";
    type?: string;
    description?: string;
    duration?: string;
    start_date?: string;
    end_date?: string;
    destination?: string;
    geoJSON?: {
        type?: "FeatureCollection";
        features?: {
            id?: string;
            type?: "Feature";
            properties?: Record<string, string | number | boolean>;
            geometry?: {
                type?: string;
                coordinates?: any;
            } | {
                type?: "GeometryCollection";
                geometries?: {
                    type?: string;
                    coordinates?: any;
                }[];
            };
        }[];
    };
    park?: string;
    trail?: string;
}>;
export declare const editTrip: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodString>;
    start_date: z.ZodOptional<z.ZodString>;
    end_date: z.ZodOptional<z.ZodString>;
    destination: z.ZodOptional<z.ZodString>;
    is_public: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    is_public?: boolean;
    duration?: string;
    start_date?: string;
    end_date?: string;
    destination?: string;
}, {
    id?: string;
    name?: string;
    is_public?: boolean;
    duration?: string;
    start_date?: string;
    end_date?: string;
    destination?: string;
}>;
export declare const deleteTrip: z.ZodObject<{
    tripId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tripId?: string;
}, {
    tripId?: string;
}>;
export declare const queryTrip: z.ZodObject<{
    queryBy: z.ZodString;
    tripId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tripId?: string;
    queryBy?: string;
}, {
    tripId?: string;
    queryBy?: string;
}>;
