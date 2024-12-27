import { type ExecutionContext } from 'hono';
import * as validator from '@packrat/validations';
import { ITEM_TABLE_NAME } from '../../db/schema';
import { VectorClient } from '../../vector/client';
import { addItemGlobalService } from './addItemGlobalService';
import { summarizeItem } from '../../utils/item';

/**
 * Adds a list of items to the global inventory and indexes them in the vector database.
 * @param {Object} items - The list of items to add.
 * @param {string} executionCtx - The execution context.
 * @param {ExecutionContext} callbacks.onItemCreated - A callback function to be called when an item is created.
 * @param {Function} callbacks.onItemCreationError - A callback function to be called when an item creation fails.
 * @return {Promise<Array>} A promise that resolves to an array of the created items.
 */
export const bulkAddItemsGlobalService = async (
  items: Iterable<validator.AddItemGlobalType>,
  executionCtx: ExecutionContext,
  callbacks?: {
    onItemCreated?: (
      item: Awaited<ReturnType<typeof addItemGlobalService>>,
      bulkIndex: number,
    ) => void;
    onItemCreationError?: (error: Error, bulkIndex: number) => void;
  },
): Promise<Array<Awaited<ReturnType<typeof addItemGlobalService>>>> => {
  const { onItemCreated, onItemCreationError } = callbacks || {};
  const createdItems: Array<Awaited<ReturnType<typeof addItemGlobalService>>> =
    [];
  const vectorData: Array<{
    id: string;
    content: string;
    namespace: string;
    metadata: {
      isPublic: boolean;
      ownerId: string;
    };
  }> = [];

  let idx = -1;
  for (const item of items) {
    idx += 1;
    try {
      const createdItem = await addItemGlobalService(item);
      if (onItemCreated) {
        onItemCreated(createdItem, idx);
      }
      createdItems.push(createdItem);

      vectorData.push({
        id: createdItem.id,
        content: summarizeItem(createdItem),
        namespace: ITEM_TABLE_NAME,
        metadata: {
          isPublic: createdItem.global || false,
          ownerId: createdItem.ownerId || '',
        },
      });
    } catch (error) {
      if (onItemCreationError) {
        onItemCreationError(error as Error, idx);
      }
    }
  }

  executionCtx.waitUntil(VectorClient.instance.syncRecords(vectorData));
  return createdItems;
};
