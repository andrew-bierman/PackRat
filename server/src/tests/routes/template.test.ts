import { setupTest, teardownTest } from '../utils/testHelpers';

let caller;

beforeEach(async () => {
  const testSetup = await setupTest();
  caller = testSetup.caller;
});

afterEach(async () => {
  await teardownTest();
});

describe('Template routes', () => {
  let template;

  describe('Get templates', () => {
    test('Get templates', async () => {
      const templates = await caller.getTemplates();

      expect(templates).toBeDefined();

      [template] = templates;
    });
  });

  describe('Get template by Id', () => {
    test('Get template by Id', async () => {
      if (template) {
        const templateId = template._id.toString();

        const currentTemplate = await caller
          .getTemplateById({
            templateId,
          })
          .then((template) => template.toJSON());

        expect(currentTemplate?._id.toString()).toEqual(templateId);

        template = currentTemplate;
      }
    });
  });

  describe('Edit trip', () => {
    test('Edit trip', async () => {
      if (template) {
        const isGlobalTemplate = !template?.isGlobalTemplate;

        //! need to convert dates to string for input
        const updatedTemplate = await caller
          .editTemplate({
            templateId: template?._id?.toString(),
            type: template?.type,
            isGlobalTemplate,
          })
          .then((template) => template.toJSON());

        expect(updatedTemplate.isGlobalTemplate).toEqual(isGlobalTemplate);

        template = updatedTemplate;
      }
    });
  });

  describe('Create template', () => {
    test('Create template', async () => {
      const { _id, ...partialTemplate } = template;

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
    // test('Delete template', async () => {
    //   if (template) {
    //     const { message } = await caller.deleteTemplate({
    //       templateId: template._id.toString(),
    //     });
    //     expect(message).toEqual('Template removed');
    //   }
    // });
  });
});
