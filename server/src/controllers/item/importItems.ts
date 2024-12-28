import { protectedProcedure } from '../../trpc';
import { addItemService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';
import Papa from 'papaparse';

export const importItems = async (c) => {
  try {
    const { content, packId, ownerId } = await c.req.json();

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
          const parsedHeaders = results.meta.fields ?? [];
          try {
            const allHeadersPresent = expectedHeaders.every((header) =>
              (parsedHeaders as string[]).includes(header),
            );
            if (!allHeadersPresent) {
              return reject(
                new Error('CSV does not contain all the expected Item headers'),
              );
            }

            for (const [index, item] of results.data.entries()) {
              if (
                index === results.data.length - 1 &&
                Object.values(item as Record<string, unknown>).every(
                  (value) => value === '',
                )
              ) {
                continue;
              }

              const row = item as {
                Name: string;
                Weight: string;
                Quantity: string;
                Unit: string;
                Category: string;
              };

              await addItemService(
                row.Name,
                Number(row.Weight),
                Number(row.Quantity),
                row.Unit,
                packId,
                row.Category as 'Food' | 'Water' | 'Essentials',
                ownerId,
                c.ctx.executionCtx,
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
    })
      .then((result) => c.json({ result }, 200))
      .catch((error) => c.json({ error: `${error.message}` }, 500));
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
            const parsedHeaders = results.meta.fields ?? [];
            try {
              const allHeadersPresent = expectedHeaders.every((header) =>
                (parsedHeaders as string[]).includes(header),
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
                  Object.values(item as Record<string, unknown>).every(
                    (value) => value === '',
                  )
                ) {
                  continue;
                }

                const row = item as {
                  Name: string;
                  Weight: string;
                  Quantity: string;
                  Unit: string;
                  Category: string;
                };

                await addItemService(
                  row.Name,
                  Number(row.Weight),
                  Number(row.Quantity),
                  row.Unit,
                  packId,
                  row.Category as 'Food' | 'Water' | 'Essentials',
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
