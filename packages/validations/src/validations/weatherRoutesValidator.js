import { z } from 'zod';
export const getWeatherWeek = z.object({
    lat: z.number(),
    lon: z.number(),
});
export const getWeather = z.object({
    lat: z.number(),
    lon: z.number(),
});
//# sourceMappingURL=weatherRoutesValidator.js.map