import z from 'zod';

const objectId = (message: any = 'valid id'): z.ZodString =>
  z.string().regex(/^[0-9a-fA-F]{24}$/, { message });

export default objectId;