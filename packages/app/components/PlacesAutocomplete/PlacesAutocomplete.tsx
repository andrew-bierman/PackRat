import { Chip } from '@packrat/ui';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { type TextInput } from 'react-native';
import { Text, XStack } from 'tamagui'; // Ensure proper imports based on imports.md
import { SearchInput } from '../SearchInput';
import { usePlacesAutoComplete } from './usePlacesAutoComplete';

interface PlacesAutocompleteProps {
  onSelect?: (geoJSON: any) => void;
  placeholder?: string;
  style?: any;
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
        onCreate={() => {}}
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

export const PlaceItem = ({ item, onPress = () => {} }: any) => {
  return (
    <XStack
      ai="center"
      p="$3"
      br="$4"
      bg="$background"
      hoverStyle={{
        bg: '$gray2',
      }}
      pressStyle={{
        bg: '$gray3',
      }}
      onPress={onPress}
    >
      <Text color="$color" fontSize="$4" flex={1}>
        {item.properties.name}
      </Text>
      <Chip rounded theme="blue" size="small" key="blue">
        <Chip.Text>{item.properties.osm_value}</Chip.Text>
      </Chip>
    </XStack>
  );
};
