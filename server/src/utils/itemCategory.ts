export const ItemCategory = ['Food', 'Water', 'Essentials'] as const;
export enum ItemCategoryEnum {
  FOOD = 'Food',
  WATER = 'Water',
  ESSENTIALS = 'Essentials',
}

export function getCategoryOrDefault(category: string): ItemCategoryEnum {
  if (ItemCategory.includes(category as any)) {
    return category as ItemCategoryEnum;
  }
  return ItemCategoryEnum.ESSENTIALS;
}
