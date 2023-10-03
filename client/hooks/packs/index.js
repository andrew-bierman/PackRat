import {
  scorePackReducer,
  deletePackItemReducer,
  changePackStatusReducer,
  addPackItemReducer,
  addPackReducer,
  editGlobalItemAsDuplicateReducer,
  editPackItemReducer,
  updatePackReducer,
} from '../../store/packsStore';

export const PACKQUERYS = {
  scorePack: 'scorePack',
  duplicatePublicPack: 'duplicatePublicPack',
  deleteItem: 'deleteItem',
  editPack: 'editPack',
  addItem: 'addItem',
  addPack: 'addPack',
  editGlobalItemAsDuplicate: 'editGlobalItemAsDuplicate',
  editItem: 'editItem',
};

export const PACKREDUCERS = {
  scorePack: scorePackReducer,
  deleteItem: deletePackItemReducer,
  editPack: changePackStatusReducer,
  addItem: addPackItemReducer,
  addPack: addPackReducer,
  editGlobalItemAsDuplicate: editGlobalItemAsDuplicateReducer,
  editItem: editPackItemReducer,
  updatePack: updatePackReducer,
};

export * from './useUserPacks';
export * from './useFetchSinglePack';
