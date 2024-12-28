import { type Context } from 'hono';
import {
  addItemGlobalService,
  bulkAddItemsGlobalService,
} from '../../services/item/item.service';
import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import Papa from 'papaparse';
import { ItemCategoryEnum } from '../../utils/itemCategory';

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
              const row = item as {
                Name: string;
                Weight: string;
                Unit: string;
                Category: string;
                image_urls?: string;
                sku?: string;
                product_url?: string;
                description?: string;
                seller?: string;
                techs?: string;
              };
              if (
                index === results.data.length - 1 &&
                Object.values(row).every((value) => value === '')
              ) {
                continue;
              }

              await addItemGlobalService(
                {
                  name: row.Name,
                  weight: Number(row.Weight),
                  unit: row.Unit,
                  type: row.Category as 'Food' | 'Water' | 'Essentials',
                  ownerId,
                  image_urls: row.image_urls,
                },
                c.executionCtx,
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

/**
 * Converts a list of raw CSV items into an iterable of validated items.
 * @param {Array<Record<string, unknown>>} csvRawItems - The raw CSV items.
 * @param {string} ownerId - The ID of the owner.
 * @returns {Iterable<validator.AddItemGlobalType>} An iterable that yields the validated items.
 */
function* sanitizeItemsIterator(
  csvRawItems: Array<Record<string, unknown>>,
  ownerId: string,
): Generator<validator.AddItemGlobalType> {
  for (let idx = 0; idx < csvRawItems.length; idx++) {
    const item = csvRawItems[idx];

    const productDetailsStr = String(item?.techs ?? '')
      .replace(/'([^']*)'\s*:/g, '"$1":') // Replace single quotes keys with double quotes.
      .replace(/:\s*'([^']*)'/g, ': "$1"') // Replace single quotes values with double quotes.
      .replace(/\\x([0-9A-Fa-f]{2})/g, (match, hex) => {
        // Replace hex escape sequences with UTF-8 characters
        const codePoint = parseInt(hex, 16);
        return String.fromCharCode(codePoint);
      });

    console.log(`${idx} / ${csvRawItems.length}`);
    let parsedProductDetails:
      | validator.AddItemGlobalType['productDetails']
      | null = null;
    try {
      parsedProductDetails = JSON.parse(productDetailsStr);
    } catch (e) {
      console.log(
        `${productDetailsStr}\nFailed to parse product details for item ${item?.Name ?? 'unknown'}: ${e.message}`,
      );
      throw e;
    }

    const validatedItem: validator.AddItemGlobalType = {
      name: String(item?.Name ?? ''),
      weight: Number(item?.Weight ?? 0),
      unit: String(item?.Unit ?? ''),
      type: String(item?.Category ?? '') as ItemCategoryEnum,
      ownerId,
      image_urls: item?.image_urls ? String(item.image_urls) : undefined,
      sku: item?.sku ? String(item.sku) : undefined,
      productUrl: item?.product_url ? String(item.product_url) : undefined,
      description: item?.description ? String(item.description) : undefined,
      seller: item?.seller ? String(item.seller) : undefined,
    };

    if (parsedProductDetails) {
      validatedItem.productDetails = parsedProductDetails;
    }

    yield validatedItem;
  }
}
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

              const lastRawItem = results.data[results.data.length - 1];
              if (
                lastRawItem &&
                Object.values(lastRawItem).every((value) => value === '')
              ) {
                results.data.pop();
              }

              const errors: Error[] = [];
              const createdItems = await bulkAddItemsGlobalService(
                sanitizeItemsIterator(results.data, ownerId),
                opts.ctx.executionCtx,
                {
                  onItemCreationError: (error) => {
                    errors.push(error);
                  },
                },
              );

              return resolve({
                status: 'success',
                items: createdItems,
                errorsCount: errors.length,
                errors,
              });
            } catch (error) {
              console.error(error);
              return reject(new Error(`Failed to add items: ${error.message}`));
            }
          },
        });
      });
    });
}
