import { set } from 'lodash';
import { useState } from 'react';

const useSearchInput = ({ onSelect, onChange, searchString }) => {
  const [isLoadingMobile, setIsLoadingMobile] = useState(false);
  const showSearchResults = !!searchString;
  const [isVisible, setIsVisible] = useState(false);

  const handleSearchResultClick = (result) => {
    if (onSelect) {
      const newSearchValue = onSelect(result);
      onChange(newSearchValue);
      setIsVisible(false);
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
