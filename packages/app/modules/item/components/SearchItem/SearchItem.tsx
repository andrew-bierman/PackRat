import { RStack, RText as OriginalRText } from '@packrat/ui';
import { useSearchItem } from './useSearchItem';
import Creatable from 'react-select/creatable';
import React, { useState, useEffect } from 'react';
import { AddItemModal } from '../AddItemModal';
import { useFetchSinglePack, usePackId } from 'app/modules/pack';
import useTheme from 'app/hooks/useTheme';

const RText: any = OriginalRText;

export const SearchItem = () => {
  const { searchString, handleSearchResultClick, results, setSearchString } =
    useSearchItem();
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [packId] = usePackId();
  const { data: currentPack } = useFetchSinglePack(packId);
  const currentPackId = currentPack && currentPack.id;

  const [options, setOptions] = useState([]);
  const [createItemTitle, setCreateItemTitle] = useState('');
  const { currentTheme } = useTheme();

  useEffect(() => {
    const mappedOptions = results.map((result) => ({
      ...result,
      label: result.name,
      value: result.id,
    }));
    setOptions(mappedOptions);
  }, [results]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: currentTheme.colors.background,
      border: 'none', // Remove border
    }),
    input: (provided) => ({
      ...provided,
      color: currentTheme.colors.text,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: currentTheme.colors.text,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: currentTheme.colors.text,
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'blue' : 'white',
      backgroundColor: state.isFocused ? '#333' : 'black',
      padding: 20,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: currentTheme.colors.background,
    }),
  };

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      handleSearchResultClick(selectedOption);
    }
  };

  return (
    <>
      <RStack style={{ width: '100%' }}>
        <Creatable
          isClearable
          onChange={handleChange}
          inputValue={searchString}
          onInputChange={setSearchString}
          options={options}
          styles={customStyles}
          onCreateOption={() => {
            setCreateItemTitle(searchString);
            setIsAddItemModalOpen(true);
          }}
          noOptionsMessage={() => 'Start typing to search for items'}
        />
        <AddItemModal
          initialData={{ name: createItemTitle }}
          showTrigger={false}
          currentPackId={currentPackId || ''}
          currentPack={currentPack}
          isAddItemModalOpen={isAddItemModalOpen}
          setIsAddItemModalOpen={setIsAddItemModalOpen}
          setRefetch={() => setRefetch((prev) => !prev)}
        />
      </RStack>
    </>
  );
};

const ResultItem = ({ item }: any) => (
  <RStack style={{ flexDirection: 'row' }}>
    <RText fontWeight="400">{item.name}</RText>
    <RText color="gray" textTransform={'capitalize'}></RText>
  </RStack>
);
