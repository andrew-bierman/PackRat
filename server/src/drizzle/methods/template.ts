import { eq } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import {
  type InsertTemplate,
  template as TemplateTable,
} from '../../db/schema';

export class Template {
  async findTemplate(templateId: string, includeRelated: boolean = false) {
    try {
      const template = await DbClient.instance.query.template.findFirst({
        where: eq(TemplateTable.id, templateId),
        // If includeRelated is true, then include with property
        ...(includeRelated && {
          with: {
            createdBy: {
              columns: {
                username: true,
              },
            },
          },
        }),
      });

      return template;
    } catch (error) {
      throw new Error(`Failed to find template by id: ${error.message}`);
    }
  }

  async findMany() {
    try {
      const templates = await DbClient.instance.query.template.findMany({
        with: {
          createdBy: {
            columns: {
              username: true,
            },
          },
        },
      });
      return templates;
    } catch (error) {
      throw new Error(`Failed to get all templates: ${error.message}`);
    }
  }

  async create(data: InsertTemplate) {
    try {
      const createdTemplate = await DbClient.instance
        .insert(TemplateTable)
        .values(data)
        .returning()
        .get();
      return createdTemplate;
    } catch (error) {
      throw new Error(`Failed to create template: ${error.message}`);
    }
  }

  async update(
    data: Partial<InsertTemplate>,
    filter = eq(TemplateTable.id, data.templateId),
  ) {
    try {
      const updatedTemplate = await DbClient.instance
        .update(TemplateTable)
        .set({
          type: data.type,
          isGlobalTemplate: data.isGlobalTemplate,
        })
        .where(filter)
        .returning();
      return updatedTemplate;
    } catch (error) {
      throw new Error(`Failed to update template: ${error.message}`);
    }
  }

  async delete(id: string, filter = eq(TemplateTable.id, id)) {
    try {
      const deletedTemplate = await DbClient.instance
        .delete(TemplateTable)
        .where(filter)
        .returning();
      return deletedTemplate;
    } catch (error) {
      throw new Error(`Failed to delete template: ${error.message}`);
    }
  }
}
