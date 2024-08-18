import { ItemCategoryEnum } from '../../modules/item/constants';

export const categoryIcons = {
  [ItemCategoryEnum.ESSENTIALS]: 'check-square',
  [ItemCategoryEnum.FOOD]: 'coffee',
  [ItemCategoryEnum.WATER]: 'droplet',
  // [ItemCategoryEnum.CLOTHING]: 'tshirt',
  // [ItemCategoryEnum.SHELTER]: 'home',
  // [ItemCategoryEnum.SLEEPING]: 'moon',
  // [ItemCategoryEnum.HYGIENE]: 'smile',
  // [ItemCategoryEnum.TOOLS]: 'tool',
  // [ItemCategoryEnum.MEDICAL]: 'heart',
  // [ItemCategoryEnum.OTHER]: 'more-horizontal',
  Undefined: 'help-circle', // Choose an appropriate icon for "Undefined" category
};
