import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { selectItemsGlobal } from '../../store/singlePackStore';

const useSearchItem = ({ dispatch }) => {
  const [searchString, setSearchString] = useState('');
  const [isLoadingMobile, setIsLoadingMobile] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState('');

  const searchResults =
    useSelector((state: any) => state.search.searchResults) || [];
  const user = useSelector((state: any) => state.auth.user);
  const [showSearchResults, setShowSearchResults] = useState(false);

  /**
   * Handles the click event when a search result item is clicked.
   *
   * @param {Object} item - The search result item that was clicked.
   * @param {number} index - The index of the search result item in the list.
   * @return {void} This function does not return a value.
   */
  const handleSearchResultClick = useCallback(
    (item: Record<string, unknown>, index: number) => {
      const ownerId = user._id;
      // @ts-expect-error
      const packId = window.location.pathname.substring('/path/'.length);
      const selectedItem = item?._id;
      const data = {
        ownerId,
        packId,
        selectedItem,
      };
      // @ts-expect-error
      dispatch(selectItemsGlobal(data));
    },
    [user],
  );

  return {
    dispatch,
    searchString,
    setSearchString,
    isLoadingMobile,
    setIsLoadingMobile,
    selectedSearch,
    setSelectedSearch,
    searchResults,
    user,
    showSearchResults,
    setShowSearchResults,
    handleSearchResultClick,
  };
};

export default useSearchItem;
