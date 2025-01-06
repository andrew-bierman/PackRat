import { useDebouncedValue } from 'app/hooks/common';
import { usePhotonDetail } from 'app/hooks/photonDetail';
import { atom, useAtom } from 'jotai';

export const placesAutocompleteSearchAtom = atom('');

export const usePlacesAutoComplete = (onSelect) => {
  const [search, setSearch] = useAtom(placesAutocompleteSearchAtom);
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
