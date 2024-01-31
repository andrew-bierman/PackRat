import { forwardRef, useImperativeHandle } from 'react';
import { SearchInput } from '../SearchInput';
import { RStack, RText } from '@packrat/ui';
import { usePlacesAutoComplete } from './usePlacesAutoComplete';

export const PlacesAutocomplete = forwardRef(
  ({ onSelect, placeholder }, ref) => {
    const { data, handleSelect, search, setSearch } =
      usePlacesAutoComplete(onSelect);

    useImperativeHandle(
      ref,
      () => ({
        searchText: search,
      }),
      [search],
    );

    return (
      <SearchInput
        onSelect={handleSelect}
        placeholder={placeholder}
        results={data}
        resultItemComponent={<PlaceItem />}
        onChange={setSearch}
        searchString={search}
      />
    );
  },
);

const PlaceItem = ({ item }) => {
  return (
    <RStack style={{ flexDirection: 'row' }}>
      <RText fontWeight="400">{item.properties.name}</RText>
      <RText color={'gray'} opacity={100} textTransform={'capitalize'}>
        {item.properties.osm_value}
      </RText>
    </RStack>
  );
};
