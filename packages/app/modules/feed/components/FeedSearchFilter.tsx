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
} from '@packrat/ui';
import { Search, X } from '@tamagui/lucide-icons';
const RStack: any = OriginalRStack;
const RText: any = OriginalRText;
const RSeparator: any = OriginalRSeparator;

const dataValues = [
  'Favorite',
  'Most Recent',
  'Lightest',
  'Heaviest',
  // 'Most Items',
  // 'Fewest Items',
  'Oldest',
];

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
            {/* <FormInput
                width='100%'
                placeholder={`Search ${feedType || 'Feed'}`}
                name="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.nativeEvent.text)}
              />
              <RIconButton
                backgroundColor="transparent"
                onPress={() => onSearch(searchValue)}
                icon={
                  <AntDesign
                    name="search1"
                    size={24}
                    color={currentTheme.colors.cardIconColor}
                  />
                }
              /> */}
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
              {/* DISABLE TRIP TEMP */}
              <RText
                fontSize={18}
                fontWeight="bold"
                color={currentTheme.colors.text}
              >
                Discover Other Users' Public Packs
              </RText>
              {/* <RText
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
                  onCheckedChange={handleToggleTrip}
                >
                  <Switch.Thumb />
                </RSwitch>*/}
            </RStack>
          )}
          {feedType === 'packTemplatess' && (
            <RStack
              style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
            >
              <RText
                fontSize={18}
                fontWeight="bold"
                color={currentTheme.colors.text}
              >
                Discover pack templates to help you get started.
              </RText>
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
                data={dataValues}
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

    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  };
};
