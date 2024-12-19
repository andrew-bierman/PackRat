import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { type TextInput } from 'react-native';
import { SearchInput } from '../SearchInput';
import { RStack as OriginalRStack, RText as OriginalRText } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';

import { usePlacesAutoComplete } from './usePlacesAutoComplete';

const RStack: any = OriginalRStack;
const RText: any = OriginalRText;

interface PlacesAutocompleteProps {
  onSelect?: (geoJSON: any) => void;
  placeholder?: string;
}

export const PlacesAutocomplete = forwardRef<any, PlacesAutocompleteProps>(
  function PlacesAutoComplete({ onSelect, placeholder }, ref) {
    const { data, handleSelect, search, setSearch } =
      usePlacesAutoComplete(onSelect);
    const inputRef = useRef<TextInput>(null);

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
      <RText fontWeight="400" color="red">
        {item.properties.name}
      </RText>
      <RText
        style={{
          backgroundColor: '#e6e6e6',
          fontWeight: 600,
          color: '#000000',
          borderRadius: 8,
          paddingLeft: 10,
          paddingRight: 10,
          width: 'auto',
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        {item.properties.osm_value}
      </RText>
    </RStack>
  );
};
