import { type Context } from 'hono';
import { addItemGlobalService } from '../../services/item/item.service';
import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import Papa from 'papaparse';

export const importItemsGlobal = async (c: Context) => {
  try {
    const { content, ownerId } = await c.req.json();

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
            'image_urls',
          ];
          const parsedHeaders = results.meta.fields;
          try {
            const allHeadersPresent = expectedHeaders.every((header) =>
              parsedHeaders.includes(header),
            );
            if (!allHeadersPresent) {
              return reject(
                new Error('CSV does not contain all the expected Item headers'),
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
                c.ctx.executionCtx,
                item.image_urls,
              );
            }
            resolve('items');
          } catch (error) {
            reject(new Error(`Failed to add items: ${error.message}`));
          }
        },
        error: function (error) {
          reject(new Error(`Error parsing CSV file: ${error.message}`));
        },
      });
    })
      .then((result) => c.json({ result }, 200))
      .catch((error) => c.json({ error: `${error.message}` }, 500));
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
              'image_urls',
              'sku',
              'product_url',
              'description',
              'techs',
              'seller',
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
                  item.image_urls,
                  item.sku,
                  item.product_url,
                  item.description,
                  item.techs,
                  item.seller,
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
