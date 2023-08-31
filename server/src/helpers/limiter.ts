import rateLimit from 'express-rate-limit';

// Time window for which requests are checked/remembered.
const WINDOW_MS = 1 * 60 * 1000; // 1 minute

// Max number of connections during WINDOW_MS before starting to delay responses.
const MAX_CONNECTIONS = 100;

export const limiter = rateLimit({
  windowMs: WINDOW_MS,
  max: MAX_CONNECTIONS,
});
