import { type Context } from 'hono';
import { bulkAddItemsGlobalService } from '../../services/item/item.service';
import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import Papa from 'papaparse';
import { ItemCategoryEnum } from '../../utils/itemCategory';

export const importItemsGlobal = async (c: Context) => {
  try {
    const { content, ownerId } = await c.req.json();
    const validHeaders = [
      'name',
      'weight',
      'weight_unit',
      'category',
      'image_urls',
      'sku',
      'product_url',
      'description',
      'techs',
      'seller',
    ] as const;

    return new Promise((resolve, reject) => {
      Papa.parse<Record<string, unknown>>(content, {
        header: true,
        complete: async function (results) {
          const parsedHeaders = results.meta.fields ?? [];
          try {
            const presentValidHeaders = parsedHeaders.filter((header) =>
              validHeaders.includes(header as (typeof validHeaders)[number]),
            );

            const invalidHeaders = presentValidHeaders.filter(
              (header) =>
                !validHeaders.includes(header as (typeof validHeaders)[number]),
            );

            if (invalidHeaders.length > 0) {
              return reject(
                new Error(
                  `Invalid header format for: ${invalidHeaders.join(', ')}`,
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
              c.executionCtx,
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
            reject(new Error(`Failed to add items: ${error.message}`));
          }
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

    // Ignore items with weight -1
    if (Number(item?.weight) === -1) {
      continue;
    }

    const productDetailsStr = String(item?.techs ?? '')
      .replace(/'([^']*)'\s*:/g, '"$1":') // Replace single quotes keys with double quotes.
      .replace(/:\s*'([^']*)'/g, ': "$1"') // Replace single quotes values with double quotes.
      .replace(/\\x([0-9A-Fa-f]{2})/g, (match, hex) => {
        // Replace hex escape sequences with UTF-8 characters
        const codePoint = parseInt(hex, 16);
        return String.fromCharCode(codePoint);
      });

    let parsedProductDetails:
      | validator.AddItemGlobalType['productDetails']
      | null = null;
    try {
      parsedProductDetails = JSON.parse(productDetailsStr);
    } catch (e) {
      console.log(
        `${productDetailsStr}\nFailed to parse product details for item ${item?.name ?? 'unknown'}: ${e.message}`,
      );
      throw e;
    }

    const validatedItem: validator.AddItemGlobalType = {
      name: String(item?.name ?? ''),
      weight: Number(item?.weight ?? 0),
      unit: String(item?.weight_unit ?? ''),
      type: String(item?.category ?? '') as ItemCategoryEnum,
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
  const validHeaders = [
    'name',
    'weight',
    'weight_unit',
    'category',
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
        Papa.parse<Record<string, unknown>>(content, {
          header: true,
          complete: async function (results) {
            const parsedHeaders = results.meta.fields ?? [];
            try {
              // Only validate headers that are present in our validHeaders list
              const presentValidHeaders = parsedHeaders.filter((header) =>
                validHeaders.includes(header as (typeof validHeaders)[number]),
              );

              // Check if any present valid headers are malformed
              const invalidHeaders = presentValidHeaders.filter(
                (header) =>
                  !validHeaders.includes(
                    header as (typeof validHeaders)[number],
                  ),
              );

              if (invalidHeaders.length > 0) {
                return reject(
                  new Error(
                    `Invalid header format for: ${invalidHeaders.join(', ')}`,
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
