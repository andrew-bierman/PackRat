import { isOriginAllowed } from "./isOriginAllowed.js";
import {  CORS_METHODS,CORS_ORIGIN } from "../config.js";

export const corsOptions = {
    origin: function (origin, callback) {
        // If no origin, or if origin is allowed, call back with no error and "allowed" status.
        if (!origin || isOriginAllowed(origin, CORS_ORIGIN)) {
            return callback(null, true);
        }

        // Otherwise, call back with an error.
        callback(new Error('Not allowed by CORS'));
    },
    methods: CORS_METHODS
}