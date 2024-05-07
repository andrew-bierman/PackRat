import { describe, it, expect, beforeAll } from 'vitest';
import { setupTest } from '../testHelpers';
import type { trpcCaller } from '../testHelpers';
import type { Template, User } from '../../db/schema';
import { env } from 'cloudflare:test';

describe('Template Routes', () => {
  let caller: trpcCaller;
  let user: User;
  let template: Template;

  beforeAll(async () => {
    caller = await setupTest(env);
    user = await caller.signUp({
      email: 'test@abc.com',
      name: 'test',
      username: 'test',
      password: 'test123',
    });
  });

  describe('addTemplate', () => {
    it('should create a template', async () => {
      const result = await caller.addTemplate({
        type: 'pack',
        createdBy: user.id,
        isGlobalTemplate: true,
        templateId: 'test-id',
      });
      expect(result.message).toEqual('Template added successfully');
    });
  });

  describe('getTemplates', () => {
    it('should get templates', async () => {
      const templates = await caller.getTemplates();
      expect(templates).toBeDefined();
      [template] = templates;
    });
  });

  describe('getTemplateById', () => {
    it('should get template by id', async () => {
      if (template) {
        const foundTemplate = await caller.getTemplateById({
          templateId: template.id,
        });
        expect(foundTemplate.id).toEqual(template.id);
      }
    });
  });

  describe('editTemplate', () => {
    it('should edit template type', async () => {
      if (template) {
        const typeToBeUpdated = 'item';
        const [updatedTemplate] = await caller.editTemplate({
          ...template,
          type: typeToBeUpdated,
        });
        expect(updatedTemplate.type).toEqual(typeToBeUpdated);
      }
    });
  });

  describe('deleteTemplate', () => {
    it('should delete template by id', async () => {
      if (template) {
        const response = await caller.deleteTemplate({
          templateId: template.id,
        });
        expect(response).toEqual('Template removed');
      }
    });
  });
});
