import { queryTrpc } from 'app/trpc';

export const useRunQueryItem = () => {
  const { mutateAsync: importItemsGlobal } =
    queryTrpc.importItemsGlobal.useMutation();
  const { mutateAsync: addItem } = queryTrpc.addItemGlobal.useMutation();
  const { mutateAsync: editItem } = queryTrpc.editItem.useMutation();
  const { mutateAsync: deleteItem } = queryTrpc.deleteGlobalItem.useMutation();

  const runMutation = async (key, data) => {
    switch (key) {
      case 'importItemsGlobal': {
        return importItemsGlobal(data);
      }
      case 'addItemGlobal': {
        return addItem(data);
      }
      case 'editItem': {
        return editItem(data);
      }
      case 'deleteGlobalItem': {
        return deleteItem(data);
      }
      default: {
        console.error(
          `please add ${key} in the mutation list. see "useRunQueryItem" hook`,
        );
      }
    }
  };

  return runMutation;
};
