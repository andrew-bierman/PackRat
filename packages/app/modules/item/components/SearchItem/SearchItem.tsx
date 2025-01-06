import { RStack, RText as OriginalRText } from '@packrat/ui';
import { SearchInput } from 'app/components/SearchInput';
import { useSearchItem } from './useSearchItem';
import React, { useState } from 'react';

import { AddItemModal } from '../AddItemModal';
import { useFetchSinglePack, usePackId } from 'app/modules/pack';

const RText: any = OriginalRText;

export const SearchItem = () => {
  const { searchString, handleSearchResultClick, results, setSearchString } =
    useSearchItem();
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [packId] = usePackId();
  const { data: currentPack } = useFetchSinglePack(packId);
  const currentPackId = currentPack && currentPack.id;
  const [createItemTitle, setCreateItemTitle] = useState('');

  return (
    <>
      <SearchInput
        searchString={searchString}
        onChange={setSearchString}
        resultItemComponent={<ResultItem />}
        placeholder="Looking for an item?"
        canCreateNewItem
        results={results}
        onSelect={handleSearchResultClick}
        onCreate={({ title }) => {
          setIsAddItemModalOpen(true);
          setCreateItemTitle(title);
        }}
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
    </>
  );
};

const ResultItem = ({ item }: any) => {
  return (
    <RStack
      style={{ flexDirection: 'row', opacity: item.isDisabled ? 0.4 : 1 }}
    >
      <RText fontWeight="400">{item.name}</RText>
      <RText color="gray" textTransform={'capitalize'}></RText>
    </RStack>
  );
};
