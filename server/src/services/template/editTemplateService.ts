import Template from "../../models/templateModel.ts";

/**
 * Edits a template.
 * @param {string} templateId - The ID of the template to edit.
 * @param {string} type - The new type of the template (optional).
 * @param {boolean} isGlobalTemplate - The new value for isGlobalTemplate (optional).
 */
export const editTemplateService = async (
    templateId: string,
    type: string,
    isGlobalTemplate: boolean
) => {
    try {
        const template: any = await Template.findById(templateId);

        if (!template) {
            throw new Error("Template not found");
        }

        template.type = type || template.type;
        template.isGlobalTemplate =
            isGlobalTemplate !== undefined ? isGlobalTemplate : template.isGlobalTemplate;

        const updatedTemplate = await template.save();
        return updatedTemplate;
    } catch (error) {
        throw new Error(error.toString());
    }
};