import { type Context } from 'hono';
import { addItemGlobalService } from '../../services/item/item.service';
import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import Papa from 'papaparse';

export const importItemsGlobal = async (c: Context) => {
  try {
    const { name, weight, quantity, unit, type, ownerId } = await c.req.json();

    const item = await addItemGlobalService(
      name,
      weight,
      quantity,
      unit,
      type,
      ownerId,
    );
    return c.json({ item }, 200);
  } catch (error) {
    return c.json({ error: `Failed to add item: ${error.message}` }, 500);
  }
};

export function importItemsGlobalRoute() {
  return protectedProcedure
    .input(validator.importItemsGlobal)
    .mutation(async (opts) => {
      const { content, ownerId } = opts.input;
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

                await addItemGlobalService(
                  item.Name,
                  item.Weight,
                  item.Quantity,
                  item.Unit,
                  item.Category,
                  ownerId,
                  opts.ctx.executionCtx,
                );
              }
              return resolve('items');
            } catch (error) {
              return reject(new Error(`Failed to add items: ${error.message}`));
            }
          },
        });
      });
    });
}
