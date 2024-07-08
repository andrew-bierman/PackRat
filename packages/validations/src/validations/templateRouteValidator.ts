import { z } from 'zod';

export const addTemplate = z.object({
  type: z.any(),
  templateId: z.string(),
  isGlobalTemplate: z.boolean(),
  createdBy: z.string(),
});

export const editTemplate = z.object({
  templateId: z.string(),
  type: z.string(),
  isGlobalTemplate: z.boolean(),
});

export const deleteTemplate = z.object({
  templateId: z.string(),
});

export const getTemplateById = z.object({
  templateId: z.string(),
});
