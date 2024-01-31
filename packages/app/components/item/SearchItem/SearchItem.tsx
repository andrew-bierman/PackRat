import { RStack, RText } from '@packrat/ui';
import { SearchInput } from 'app/components/SearchInput';
import { useSearchItem } from './useSearchItem';

export const SearchItem = () => {
  const { searchString, handleSearchResultClick, results, setSearchString } =
    useSearchItem();

  return (
    <SearchInput
      searchString={searchString}
      onChange={setSearchString}
      resultItemComponent={<ResultItem />}
      placeholder="Search Item"
      results={results}
      onSelect={handleSearchResultClick}
    />
  );
};

const ResultItem = ({ item }) => {
  return (
    <RStack style={{ flexDirection: 'row' }}>
      <RText fontWeight="400">{item.name}</RText>
      <RText color="gray" textTransform={'capitalize'}></RText>
    </RStack>
  );
};
