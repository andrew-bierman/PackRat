import { useMemo } from 'react';

const SORT_OPTIONS = {
  FAVORITE: 'Favorite',
  MOST_RECENT: 'Most Recent',
  LIGHTEST: 'Lightest',
  HEAVIEST: 'Heaviest',
  OLDEST: 'Oldest',
  //   MOST_ITEMS: 'Most Items',
  //   FEWEST_ITEMS: 'Fewest Items',
};
const packSortOptions = [
  SORT_OPTIONS.FAVORITE,
  SORT_OPTIONS.MOST_RECENT,
  SORT_OPTIONS.LIGHTEST,
  SORT_OPTIONS.HEAVIEST,
  SORT_OPTIONS.OLDEST,
];

const productsSortOptions = [SORT_OPTIONS.MOST_RECENT, SORT_OPTIONS.OLDEST];

const commonOptions = [SORT_OPTIONS.MOST_RECENT, SORT_OPTIONS.OLDEST];

const packTemplateSortOptions = [SORT_OPTIONS.LIGHTEST, SORT_OPTIONS.HEAVIEST];

export const useFeedSortOptions = (feedType, isTripsEnabled = false) => {
  return useMemo(() => {
    if (feedType === 'packTemplates') return packTemplateSortOptions;
    if (feedType === 'products') return productsSortOptions;
    return isTripsEnabled ? commonOptions : packSortOptions;
  }, [isTripsEnabled]);
};
