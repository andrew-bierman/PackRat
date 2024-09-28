import React, { useRef, useContext, useEffect, useState } from 'react';
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
  DropdownComponent,
  RSwitch,
} from '@packrat/ui';
import { Search, X } from '@tamagui/lucide-icons';
import { Switch } from 'tamagui';
import { useFeedSortOptions } from '../hooks';
const RStack: any = OriginalRStack;
const RText: any = OriginalRText;
const RSeparator: any = OriginalRSeparator;

interface FeedSearchFilterProps {
  feedType?: string | null;
  isSortHidden?: boolean;
  handleSortChange?: (value: string) => void;
  handleTogglePack?: () => void;
  handleToggleTrip?: () => void;
  selectedTypes?: { pack: boolean; trip: boolean };
  queryString?: string;
  setSearchQuery?: (query: string) => void;
  handleCreateClick?: () => void;
  value?: string;
  onChange?: (value: string) => void;
}

export const FeedSearchFilter = ({
  feedType,
  isSortHidden,
  handleSortChange,
  handleTogglePack,
  handleToggleTrip,
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
    selectedTypes?.trip || feedType === 'userTrips',
  );

  // const onSearch = (search) => (setSearchQuery) ? setSearchQuery(search) : null;
  const handleSetSearchValue = (v: string) => {
    setSearchValue(v);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setSearchQuery(v);
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
          <RStack style={{ flexDirection: 'row', margin: 0, padding: 0 }}>
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
        <RStack
          // flex={1}
          flexWrap="wrap"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
          margin={2}
        >
          {feedType === 'public' && (
            <RStack
              style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
            >
              <RText
                fontSize={18}
                fontWeight="bold"
                color={currentTheme.colors.tertiaryBlue}
              >
                Packs
              </RText>

              <RSwitch
                id="single-switch"
                size="$1.5"
                checked={selectedTypes?.pack ?? false}
                disabled={!selectedTypes?.trip}
                onCheckedChange={handleTogglePack}
              >
                <Switch.Thumb />
              </RSwitch>
              <RText
                fontSize={18}
                fontWeight="bold"
                color={currentTheme.colors.tertiaryBlue}
              >
                Trips
              </RText>
              <RSwitch
                id="two-switch"
                size="$1.5"
                checked={selectedTypes?.trip ?? false}
                disabled={!selectedTypes?.pack}
                onCheckedChange={handleToggleTrip}
              >
                <Switch.Thumb />
              </RSwitch>
            </RStack>
          )}
          <RStack
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              display: 'flex',
              gap: 10,
              width: '100%',
              marginTop: 15,
              justifyContent: 'space-between',
            }}
          >
            <RText
              fontSize={17}
              fontWeight="bold"
              color={currentTheme.colors.text}
            >
              Sort By:
            </RText>
            <View style={{ flex: 1 }}>
              <DropdownComponent
                value={queryString}
                data={sortOptions}
                onValueChange={handleSortChange}
                placeholder={queryString}
              />
            </View>
          </RStack>
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
    mainContainer: {
      // flex: 1,
      backgroundColor: currentTheme.colors.background,
      fontSize: 18,
      padding: 15,
    },
    filterContainer: {
      backgroundColor: currentTheme.colors.card,
      padding: 15,
      fontSize: 18,
      width: '100%',
      borderRadius: 10,
      marginTop: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
    },

    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  };
};
