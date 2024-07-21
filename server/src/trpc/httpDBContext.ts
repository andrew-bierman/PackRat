import { type Context } from 'hono';
import { createContext } from './context';

// A middleware to initiate db connection and add it to the context
const httpDBContext = async (c: Context, next: () => Promise<void>) => {
  await createContext(c)();
  await next();
};

export { httpDBContext };
