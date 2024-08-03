import { z } from 'zod';
export const getTrails = z.object({
    administrative_area_level_1: z.string(),
    country: z.string(),
    locality: z.string(),
    latitude: z.number(),
    longitude: z.number(),
});
//# sourceMappingURL=trailsRouteValidator.js.map