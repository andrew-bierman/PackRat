import { protectedProcedure } from '../../trpc';
import { addItemService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';
import Papa from 'papaparse';

export const importItems = async (c) => {
  try {
    const { name, weight, quantity, unit, packId, type, ownerId } =
      await c.req.json();

    const result = await addItemService(
      name,
      weight,
      quantity,
      unit,
      packId,
      type,
      ownerId,
    );
    return c.json({ result }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function importItemsRoute() {
  return protectedProcedure
    .input(validator.importItem)
    .mutation(async (opts) => {
      const { content, packId, ownerId } = opts.input;
      return new Promise((resolve, reject) => {
        Papa.parse(content, {
          header: true,
          complete: async function (results) {
            const expectedHeaders = [
              'Name',
              'Weight',
              'Unit',
              'Quantity',
              'Category',
            ];
            const parsedHeaders = results.meta.fields;
            try {
              const allHeadersPresent = expectedHeaders.every((header) =>
                parsedHeaders.includes(header),
              );
              if (!allHeadersPresent) {
                return reject(
                  new Error(
                    'CSV does not contain all the expected Item headers',
                  ),
                );
              }

              for (const [index, item] of results.data.entries()) {
                if (
                  index === results.data.length - 1 &&
                  Object.values(item).every((value) => value === '')
                ) {
                  continue;
                }

                await addItemService(
                  item.Name,
                  item.Weight,
                  item.Quantity,
                  item.Unit,
                  packId,
                  item.Category,
                  ownerId,
                  opts.ctx.executionCtx,
                );
              }
              resolve('result');
            } catch (err) {
              console.error('Error parsing CSV file:', err);
              reject(err);
            }
          },
          error: function (error) {
            console.error('Error parsing CSV file:', error);
            reject(error);
          },
        });
      });
    });
}
