import {
  Form,
  InputWithIcon,
  RSeparator as OriginalRSeparator,
  RStack as OriginalRStack,
  RText as OriginalRText,
  XStack,
} from '@packrat/ui';
import { Plus, Search, X } from '@tamagui/lucide-icons';
import FilterBadge from 'app/components/FilterBadge';
import RSecondaryButton from 'app/components/RSecondaryButton';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { useFeedSortOptions } from '../hooks';

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
  const [searchValue, setSearchValue] = useState('');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    if (queryString && !sortOptions.includes(queryString) && handleSortChange) {
      handleSortChange?.(sortOptions?.[0] ?? '');
    }
  }, [sortOptions, queryString]);

  // Filters Component
  const Filters = () => (
    <XStack ai="center" jc="flex-start" gap={'$2'} mb={'$2'}>
      {feedType === 'public' && (
        <FilterBadge
          menuItems={['Packs', 'Trips']}
          selectedValue={selectedTypes?.pack ? 'Packs' : 'Trips'}
          onSelect={(value) => handleTypeChange?.(value)}
        />
      )}

      <FilterBadge
        menuItems={sortOptions}
        selectedValue={queryString ?? sortOptions?.[0] ?? ''}
        onSelect={handleSortChange ?? (() => {})}
      />

      {(feedType === 'userPacks' || feedType === 'userTrips') && (
        <RSecondaryButton
          style={{ marginLeft: 'auto', marginTop: 8 }}
          label="Add new"
          icon={<Plus />}
          onPress={handleCreateClick}
        />
      )}
    </XStack>
  );

  return (
    <>
      {/* Render Filters Outside Container on Native */}
      {Platform.OS !== 'web' ? (
        <Filters />
      ) : (
        <View style={styles.filterContainer}>
          {/* Render Search Container Only on Web */}
          {Platform.OS === 'web' && (
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
          )}
          <RSeparator />

          {/* Render Filters Inside Container on Web */}
          {Platform.OS === 'web' && !isSortHidden && <Filters />}

          <RSeparator mt={10} mb={10} mr={0} ml={0} />
        </View>
      )}
    </>
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
