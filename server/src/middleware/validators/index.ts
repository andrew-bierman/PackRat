import { z } from 'zod';

export const JoiObjectId = (message = 'valid id') =>
  z.string().regex(/^[0-9a-fA-F]{24}$/, message);

export * from './userRoutesValidator';
export * from './tripRoutesValidator';
export * from './packRoutesValidator';
export * from './itemRoutesValidator';
