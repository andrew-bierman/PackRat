import { RStack, RText as OriginalRText } from '@packrat/ui';
import { SearchInput } from 'app/components/SearchInput';
import { useSearchItem } from './useSearchItem';

const RText: any = OriginalRText;

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

const ResultItem = ({ item }: any) => {
  return (
    <RStack style={{ flexDirection: 'row' }}>
      <RText fontWeight="400">{item.name}</RText>
      <RText color="gray" textTransform={'capitalize'}></RText>
    </RStack>
  );
};
