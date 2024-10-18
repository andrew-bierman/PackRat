import { set } from 'lodash';
import { useState } from 'react';
import { useFetchSinglePack, usePackId } from 'app/modules/pack';
import { OfflineCreatePackOptions } from '@rnmapbox/maps';

const useSearchInput = ({ onSelect, onChange, searchString, onCreate }) => {
  const [isLoadingMobile, setIsLoadingMobile] = useState(false);
  const showSearchResults = !!searchString;
  const [isVisible, setIsVisible] = useState(false);

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [packId] = usePackId();
  const { data: currentPack } = useFetchSinglePack(packId);
  const currentPackId = currentPack && currentPack.id;

  const [createItemTitle, setCreateItemTitle] = useState('');

  const handleSearchResultClick = (result) => {
    if (onSelect) {
      onChange('');
      setIsVisible(false);
      if (result.id === 'create') {
        onCreate(result);
      } else {
        onSelect(result);
      }
    }
  };

  const handleClearSearch = () => {
    onChange('');
    setIsVisible(false);
  };

  const handleSearchChange = (text) => {
    onChange(text);
    setIsVisible(true);
  };

  return {
    searchString,
    showSearchResults,
    handleSearchResultClick,
    handleClearSearch,
    handleSearchChange,
    isLoadingMobile,
    isVisible,
  };
};

export default useSearchInput;
