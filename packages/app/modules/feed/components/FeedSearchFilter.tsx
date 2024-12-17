import React, { useRef, useEffect, useState } from 'react';
import useTheme from 'app/hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { View } from 'react-native';
import {
  RText as OriginalRText,
  RStack as OriginalRStack,
  RSeparator as OriginalRSeparator,
  RButton,
  Form,
  InputWithIcon,
} from '@packrat/ui';
import { Search, X } from '@tamagui/lucide-icons';
import { useFeedSortOptions } from '../hooks';
import FilterBadge from 'app/components/FilterBadge';

const RStack = OriginalRStack;
const RText = OriginalRText;
const RSeparator = OriginalRSeparator;

interface FeedSearchFilterProps {
  feedType?: string | null;
  isSortHidden?: boolean;
  handleSortChange?: (value: string) => void;
  handleTypeChange?: (type: string) => void;
  selectedTypes?: { pack: boolean; trip: boolean };
  queryString?: string;
  setSearchQuery?: (query: string) => void;
  handleCreateClick?: () => void;
}

export const FeedSearchFilter = ({
  feedType,
  isSortHidden,
  handleSortChange,
  handleTypeChange,
  selectedTypes,
  queryString,
  setSearchQuery,
  handleCreateClick,
}: FeedSearchFilterProps) => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const [searchValue, setSearchValue] = useState();
  const debounceTimerRef = useRef(null);
  const sortOptions = useFeedSortOptions(
    feedType,
    selectedTypes?.trip || feedType === 'userTrips',
  );

  const handleSetSearchValue = (v: string) => {
    setSearchValue(v);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setSearchQuery?.(v);
    }, 600);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!sortOptions.includes(queryString) && handleSortChange) {
      handleSortChange(sortOptions[0]);
    }
  }, [sortOptions, queryString]);

  return (
    <View style={styles.filterContainer}>
      <View style={styles.searchContainer}>
        <Form>
          <RStack
            style={{
              flexDirection: 'row',
              margin: 0,
              padding: 0,
              width: '100%',
            }}
          >
            <InputWithIcon
              LeftIcon={<Search />}
              RightIcon={<X />}
              onChange={handleSetSearchValue}
              placeholder={`Search ${feedType || 'Feed'}`}
              value={searchValue}
            />
          </RStack>
        </Form>
      </View>
      <RSeparator />

      {!isSortHidden && (
        <RStack style={{ flexDirection: 'row' }}>
          {feedType === 'public' && (
            <FilterBadge
              menuItems={['Packs', 'Trips']}
              selectedValue={selectedTypes?.pack ? 'Packs' : 'Trips'}
              onSelect={(value) => handleTypeChange?.(value)}
            />
          )}

          <FilterBadge
            menuItems={sortOptions}
            selectedValue={queryString}
            onSelect={handleSortChange}
          />

          {(feedType === 'userPacks' || feedType === 'userTrips') && (
            <RButton
              style={{ marginLeft: 'auto', marginTop: 8 }}
              onPress={handleCreateClick}
            >
              Create
            </RButton>
          )}
        </RStack>
      )}

      <RSeparator
        marginTop={10}
        marginBottom={10}
        marginRight={0}
        marginLeft={0}
      />
    </View>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;

  return {
    filterContainer: {
      backgroundColor: currentTheme.colors.card,
      padding: 15,
      fontSize: 18,
      width: '100%',
      borderRadius: 10,
      marginTop: 20,
      marginBottom: 8,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
    },
  };
};
