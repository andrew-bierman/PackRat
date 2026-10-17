import type MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ComponentProps } from 'react';

type CommunityIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

// One-line summary under a template's name: "12 items · 4.2 kg · Backpacking".
// The weight is dropped when the template has none, the category when unset.

export function templateSubtitle({
  itemCount,
  weightLabel,
  category,
  itemWord,
  itemsWord,
}: {
  itemCount: number;
  /** Formatted total weight, or null when the template weighs nothing. */
  weightLabel: string | null;
  category: string | null | undefined;
  itemWord: string;
  itemsWord: string;
}): string {
  const parts = [`${itemCount} ${itemCount === 1 ? itemWord : itemsWord}`];
  if (weightLabel) parts.push(weightLabel);
  if (category) parts.push(category.charAt(0).toUpperCase() + category.slice(1));
  return parts.join(' · ');
}

const CATEGORY_ICONS: Readonly<Record<string, CommunityIconName>> = Object.freeze({
  hiking: 'walk',
  backpacking: 'bag-personal',
  camping: 'tent',
  climbing: 'image-filter-hdr',
  winter: 'snowflake',
  skiing: 'ski',
  'water sports': 'waves',
  desert: 'weather-sunny',
  custom: 'cog',
} as const);

/** MaterialCommunityIcons name for a template's category tile. */
export function templateCategoryIcon(category: string | null | undefined): CommunityIconName {
  return (category && CATEGORY_ICONS[category]) || 'bag-personal';
}
