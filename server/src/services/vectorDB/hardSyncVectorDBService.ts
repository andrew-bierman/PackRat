import { VectorClient } from 'src/vector/client';
import * as ItemService from 'src/services/item/item.service';
import { summarizeItem } from 'src/utils/item';

export const hardSyncVectorDB = async () => {
  const deleteVectorDBResponse = await VectorClient.instance.deleteVectorDB();
  console.log('deleteVectorDBResponse', deleteVectorDBResponse);

  const createVectorDBResponse = await VectorClient.instance.createVectorDB();
  console.log('createVectorDBResponse', createVectorDBResponse);

  const { items } = await ItemService.getItemsGloballyService(0, 0);
  console.log('itemsCount', items.length);

  const records = [];
  for (const item of items) {
    records.push({
      id: item.id,
      content: summarizeItem(item),
      namespace: 'item',
      metadata: {
        id: item.id,
        global: item.global,
      },
    });
  }
  await VectorClient.instance.syncRecords(records);
};
