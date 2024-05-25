import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { type TextInput } from 'react-native';
import { SearchInput } from '../SearchInput';
import { RStack as OriginalRStack, RText as OriginalRText } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';

import { usePlacesAutoComplete } from './usePlacesAutoComplete';

const RStack: any = OriginalRStack;
const RText: any = OriginalRText;

interface PlacesAutocompleteProps {
  onSelect: (geoJSON: any) => void;
  placeholder?: string;
}

export const PlacesAutocomplete = forwardRef<any, PlacesAutocompleteProps>(
  function PlacesAutoComplete({ onSelect, placeholder }, ref) {
    const { data, handleSelect, search, setSearch } =
      usePlacesAutoComplete(onSelect);
    const inputRef = useRef<TextInput>();

    useImperativeHandle(
      ref,
      () => ({
        searchText: search,
        focus: () => inputRef.current?.focus(),
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
        ref={inputRef}
      />
    );
  },
);

const PlaceItem = ({ item }: any) => {
  const { currentTheme } = useTheme();
  return (
    <RStack style={{ flexDirection: 'row' }}>
      <RText fontWeight="400">{item.properties.name}</RText>
      <RText opacity={100} textTransform={'capitalize'}>
        {item.properties.osm_value}
      </RText>
    </RStack>
  );
};
