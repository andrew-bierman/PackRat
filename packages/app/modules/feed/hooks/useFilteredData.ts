import { useMemo } from 'react';
import { fuseSearch } from 'app/utils/fuseSearch';

export const useFilteredData = (data, searchQuery) => {
  return useMemo(() => {
    if (!data) return [];
    const keys = ['name', 'items.name', 'items.category'];
    const options = {
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
    };
    const results = fuseSearch(data, searchQuery, keys, options);
    return searchQuery ? results.map((result) => result.item) : data;
  }, [searchQuery, data]);
};
