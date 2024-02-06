import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedSearchResult,
  clearSearchResults,
} from '../../store/searchStore';
import { setLatLng } from '../../store/weatherStore';
import { usePhotonDetail } from 'app/hooks/photonDetail';
import { type RootState } from 'store/store';
import { debounce, throttle } from 'lodash';

const useSearchInput = (onSelect) => {
  const [searchString, setSearchString] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoadingMobile, setIsLoadingMobile] = useState(false);

  const { refetch, data } = usePhotonDetail(searchString, showSearchResults);
  const [selectedSearch, setSelectedSearch] = useState('');
  const searchInput = useRef(null);

  const dispatch = useDispatch();

  const handleSearchResultClick = (result) => {
    dispatch(setSelectedSearchResult(result));
    setSearchString(result.properties.name);
    setSelectedSearch(result);
    setShowSearchResults(false);
    if (onSelect) {
      onSelect(result);
    }
  };
  
  const debouncedSearchString = useCallback(
    debounce(async (e) => {
      setSearchString(e);
      refetch().then((res) => {
        setShowSearchResults(true)
      })
    }, 1000),
    [],
  );

  const handleChange = useCallback(
    (text) => {
      debouncedSearchString(text);
    },
    [debouncedSearchString],
  );

  const resetSearchInputText = () => {
    searchInput.current.value = "";
  }

  const handleClearSearch = () => {
    setShowSearchResults(false);
    setSearchString('');
    resetSearchInputText();
    dispatch(clearSearchResults());
  };


  return {
    searchString,
    setSearchString,
    showSearchResults,
    setShowSearchResults,
    data,
    handleSearchResultClick,
    handleClearSearch,
    isLoadingMobile,
    handleChange,
    searchInput,
    selectedSearch,
    setSelectedSearch
  };
};

export default useSearchInput;
