import { RStack, RText as OriginalRText } from '@packrat/ui';
import { SearchInput } from 'app/components/SearchInput';
import { useSearchItem } from './useSearchItem';

const RText: any = OriginalRText;

export const SearchItem = ({ onSelect }) => {
  const { searchString, results, setSearchString } = useSearchItem();

  return (
    <SearchInput
      searchString={searchString}
      onChange={setSearchString}
      resultItemComponent={<ResultItem />}
      placeholder="Search Global Item"
      results={results}
      onSelect={onSelect}
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
