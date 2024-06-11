import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { setupTest } from '../testHelpers';
import type { trpcCaller } from '../testHelpers';
import { env } from 'cloudflare:test';
import { Template as TemplateClass } from '../../drizzle/methods/template';
import { User as UserClass } from '../../drizzle/methods/User';
import type { Template } from '../../db/schema';

describe('Template Routes', () => {
  let caller: trpcCaller;
  const templateClass = new TemplateClass();
  const userClass = new UserClass();

  let createdTemplate: Template;

  beforeAll(async () => {
    caller = await setupTest(env);
  });

  beforeEach(async () => {
    createdTemplate = await templateClass.create({
      templateId: 'test',
      isGlobalTemplate: true,
      type: 'pack',
    });
  });

  describe('addTemplate', () => {
    it('should create a template', async () => {
      const user = await userClass.create({
        email: 'test@abc.com',
        name: 'test',
        username: 'test',
        password: 'test123',
      });
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
    });
  });

  describe('getTemplateById', () => {
    it('should get template by id', async () => {
      const foundTemplate = await caller.getTemplateById({
        templateId: createdTemplate.id,
      });
      expect(foundTemplate.id).toEqual(createdTemplate.id);
    });
  });

  describe('editTemplate', () => {
    it('should edit template type', async () => {
      const typeToBeUpdated = 'item';
      const { isGlobalTemplate, ...rest } = createdTemplate;
      const [updatedTemplate] = await caller.editTemplate({
        ...rest,
        templateId: createdTemplate.id,
        type: typeToBeUpdated,
        isGlobalTemplate: isGlobalTemplate === null ? false : isGlobalTemplate,
      });
      expect(updatedTemplate?.type).toEqual(typeToBeUpdated);
    });
  });

  describe('deleteTemplate', () => {
    it('should delete template by id', async () => {
      const response = await caller.deleteTemplate({
        templateId: createdTemplate.id,
      });
      expect(response.message).toEqual('Template removed');
    });
  });
});
