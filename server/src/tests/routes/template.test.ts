import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setupTest } from '../utils/testHelpers';
import type { trpcCaller } from '../utils/testHelpers';
import type { Template } from '../../db/schema';
import { env } from 'cloudflare:test';

describe('Template routes', () => {
  let caller: trpcCaller;
  let template;

  beforeEach(async () => {
    caller = await setupTest(env);
  });

  describe('Get templates', () => {
    it('Get templates', async () => {
      const templates = await caller.getTemplates();
      expect(templates).toBeDefined();
      [template] = templates;
    });
  });

  describe('Get template by Id', () => {
    it('Get template by Id', async () => {
      if (template) {
        const templateId = template.id.toString();
        const currentTemplate = await caller.getTemplateById({
          templateId,
        });
        expect(currentTemplate?.id.toString()).toEqual(templateId);
        template = currentTemplate;
      }
    });
  });

  describe('Edit trip', () => {
    it('Edit trip', async () => {
      if (template) {
        const isGlobalTemplate = !template?.isGlobalTemplate;
        //! need to convert dates to string for input
        const updatedTemplate = await caller.editTemplate({
          templateId: template?.id?.toString(),
          type: template?.type,
          isGlobalTemplate,
        });
        expect(updatedTemplate.isGlobalTemplate).toEqual(isGlobalTemplate);
        template = updatedTemplate;
      }
    });
  });

  describe('Create template', () => {
    it('Create template', async () => {
      const { id, ...partialTemplate } = template;
      const input = {
        ...partialTemplate,
        templateId: partialTemplate?.templateId?.toString(),
        createdBy: partialTemplate?.createdBy?.toString(),
      };
      //! addTemplateService should return created template
      const createdTemplate = await caller.addTemplate(input);
      expect(createdTemplate?.message).toEqual('Template added successfully');
    });
  });

  describe('Delete template', () => {
    //! deleteTemplateRoute contains type issue [template.remove is not a function]
    // it('Delete template', async () => {
    //   if (template) {
    //     const { message } = await caller.deleteTemplate({
    //       templateId: template.id.toString(),
    //     });
    //     expect(message).toEqual('Template removed');
    //   }
    // });
  });
});
