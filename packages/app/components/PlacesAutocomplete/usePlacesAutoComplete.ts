import { usePhotonDetail } from 'app/hooks/photonDetail';
import { useState } from 'react';
import { useDebouncedValue } from 'app/hooks/common';

export const usePlacesAutoComplete = (onSelect) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 200);
  const { data } = usePhotonDetail(debouncedSearch, !!debouncedSearch);

  const handleSelect = (result) => {
    onSelect(result);
    setSearch('');
    // return new value of the input
    return result.properties.name;
  };

  return {
    search,
    setSearch,
    data,
    handleSelect,
  };
};
