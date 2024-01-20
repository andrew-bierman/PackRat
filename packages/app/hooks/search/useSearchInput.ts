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
  const selectedSearchResult =
    useSelector((state: RootState) => state.search.selectedSearchResult) || {};

  const { refetch, data } = usePhotonDetail(searchString, showSearchResults);
  const [selectedSearch, setSelectedSearch] = useState('');
  const searchInput = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowSearchResults(searchString.length > 0);
    const timeout = setTimeout(() => {
      if (!searchString) return;
      refetch();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [searchString]);

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
      dispatch(refetch());
      setShowSearchResults(true);
    }, 1000),
    [],
  );

  const handleChange = useCallback(
    (text) => {
      debouncedSearchString(text);
    },
    [debouncedSearchString],
  );

  const handleClearSearch = () => {
    setShowSearchResults(false);
    setSearchString('');
    dispatch(clearSearchResults());
  };

  return {
    searchString,
    setSearchString,
    showSearchResults,
    setShowSearchResults,
    selectedSearchResult,
    setSelectedSearchResult,
    data,
    handleSearchResultClick,
    handleClearSearch,
    isLoadingMobile,
    handleChange,
    searchInput
  };
};

export default useSearchInput;
