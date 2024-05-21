import React, { useCallback, useState } from 'react';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { Switch } from 'tamagui';
import { Platform, View } from 'react-native';
import {
  RIconButton,
  RSwitch,
  RText,
  RStack,
  RSeparator,
  RButton,
  RInput,
  Form,
  FormInput,
} from '@packrat/ui';
import { AntDesign } from '@expo/vector-icons';
import DropdownComponent from 'app/components/Dropdown';

const dataValues = [
  'Favorite',
  'Most Recent',
  'Lightest',
  'Heaviest',
  'Most Items',
  'Fewest Items',
  'Oldest',
];

interface FeedSearchFilterProps {
  feedType: string;
  isSortHidden: boolean;
  handleSortChange: (value: string) => void;
  handleTogglePack: () => void;
  handleToggleTrip: () => void;
  selectedTypes: { pack: boolean; trip: boolean };
  queryString: string;
  setSearchQuery: (query: string) => void;
  handleCreateClick: () => void;
}

const FeedSearchFilter = ({
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
  const [searchValue, setSearchValue] = useState('');

  const onSearch = (search) => setSearchQuery(search);

  return (
    <View style={styles.filterContainer}>
      <View style={styles.searchContainer}>
        <Form>
          <RStack
            space={3}
            style={{ flexDirection: 'row', justifyContent: 'center' }}
          >
            <FormInput
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
                color={currentTheme.colors.textColor}
              >
                Packs
              </RText>

              <RSwitch
                id="single-switch"
                size="$1.5"
                width="$4"
                checked={selectedTypes.pack}
                onCheckedChange={handleTogglePack}
              >
                <Switch.Thumb />
              </RSwitch>
              <RText
                fontSize={18}
                fontWeight="bold"
                color={currentTheme.colors.textColor}
              >
                Trips
              </RText>
              <RSwitch
                id="two-switch"
                size="$1.5"
                width="$4"
                checked={selectedTypes.trip}
                onCheckedChange={handleToggleTrip}
              >
                <Switch.Thumb />
              </RSwitch>
            </RStack>
          )}
          <RStack
            style={{ flexDirection: 'row', gap:Platform.OS === 'web' ? 10 : 60 , alignItems: 'center' }}
          >
            <RText
              fontSize={Platform.OS === 'web' ? 17 : 15}
              fontWeight="bold"
              color={currentTheme.colors.textColor}
            >
              Sort By:
            </RText>
            <DropdownComponent
              value={queryString}
              data={dataValues}
              onValueChange={handleSortChange}
              placeholder="Sort By"
              style={styles.dropdown}
              width= {Platform.OS === 'web' ? 150 : 120}
              
            />
          </RStack>
          {(feedType === 'userPacks' || feedType === 'userTrips') && (
            <RButton onPress={handleCreateClick}>Create</RButton>
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
      flex: 1,
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
      marginTop: Platform.OS !== 'web' ? 20 : 0,
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

export default FeedSearchFilter;
