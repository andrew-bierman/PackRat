import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedSearchResult,
  clearSearchResults,
} from '../../store/searchStore';
import { setLatLng } from '../../store/weatherStore';
import { usePhotonDetail } from '~/hooks/photonDetail';

const useSearchInput = (onSelect) => {
  const [searchString, setSearchString] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoadingMobile, setIsLoadingMobile] = useState(false);
  const selectedSearchResult =
    useSelector((state) => state.search.selectedSearchResult) || {};

  const { refetch, data } = usePhotonDetail(searchString, showSearchResults);

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
    setShowSearchResults(false);
    if (onSelect) {
      onSelect(result);
    }
  };

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
  };
};

export default useSearchInput;
