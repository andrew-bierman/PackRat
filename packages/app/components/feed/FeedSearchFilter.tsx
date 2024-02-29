import React, { useState } from 'react';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { Switch } from 'tamagui';
import { View } from 'react-native';
import {
  RIconButton,
  RSwitch,
  RText,
  RStack,
  RSeparator,
  RButton,
  RInput,
} from '@packrat/ui';
import { AntDesign } from '@expo/vector-icons';
import DropdownComponent from 'app/components/Dropdown';
import { debounce } from 'lodash';
import { loadStyles } from './FeedSearchFilter.style';

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
  const [search, setSearch] = useState('');
  return (
    <View style={styles.filterContainer}>
      <View style={styles.searchContainer}>
        <RStack
          space={3}
          style={{ flexDirection: 'row', justifyContent: 'center' }}
        >
          <RInput
            size="$30"
            placeholder={`Search ${feedType || 'Feed'}`}
            onChangeText={(value) => {
              setSearch(value);
              debounce(() => {
                setSearchQuery(value);
              }, 500);
            }}
            value={search}
          />
          <RIconButton
            backgroundColor="transparent"
            icon={
              <AntDesign
                name="search1"
                size={24}
                color={currentTheme.colors.cardIconColor}
              />
            }
          />
        </RStack>
      </View>
      <RSeparator />
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
        <RStack style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <RText
            fontSize={17}
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
            width={150}
          />
        </RStack>
        {(feedType === 'userPacks' || feedType === 'userTrips') && (
          <RButton onPress={handleCreateClick}>Create</RButton>
        )}
      </RStack>
      <RSeparator
        marginTop={10}
        marginBottom={10}
        marginRight={0}
        marginLeft={0}
      />
    </View>
  );
};

export default FeedSearchFilter;
