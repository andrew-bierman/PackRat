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

              await addItemGlobalService({
                name: item.Name,
                weight: item.Weight,
                unit: item.Unit,
                type: item.Category,
                ownerId,
                executionCtx: c.ctx.executionCtx,
                image_urls: item.image_urls,
              });
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
  const expectedHeaders = [
    'Name',
    'Weight',
    'Unit',
    'Category',
    'image_urls',
    'sku',
    'product_url',
    'description',
    'techs',
    'seller',
  ] as const;
  return protectedProcedure
    .input(validator.importItemsGlobal)
    .mutation(async (opts) => {
      const { content, ownerId } = opts.input;
      return new Promise((resolve, reject) => {
        Papa.parse<Record<(typeof expectedHeaders)[number], unknown>>(content, {
          header: true,
          complete: async function (results) {
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

              const lastRawItem = results.data[results.data.length - 1];
              if (
                lastRawItem &&
                Object.values(lastRawItem).every((value) => value === '')
              ) {
                results.data.pop();
              }

              for (const item of results.data) {
                await addItemGlobalService({
                  name: String(item.Name),
                  weight: Number(item.Weight),
                  unit: String(item.Unit),
                  type: String(item.Category),
                  ownerId,
                  executionCtx: opts.ctx.executionCtx,
                  image_urls: item.image_urls && String(item.image_urls),
                  sku: item.sku && String(item.sku),
                  productUrl: item.product_url && String(item.product_url),
                  description: item.description && String(item.description),
                  seller: item.seller && String(item.seller),
                  productDetails: item.techs,
                });
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
