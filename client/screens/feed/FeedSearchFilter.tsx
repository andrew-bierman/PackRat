import React from 'react';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';
import { Switch, debounce } from 'tamagui';
import { StyleSheet, FlatList, View, ScrollView, Platform } from 'react-native';
import {
    RIconButton,
    RSwitch,
    RText,
    RStack,
    RSeparator,
    RButton,
} from '@packrat/ui';
import { Input, Text } from 'tamagui';
import { AntDesign } from '@expo/vector-icons';
import DropdownComponent from '~/components/Dropdown';

const dataValues = [
    'Favorite',
    'Most Recent',
    'Lightest',
    'Heaviest',
    'Most Items',
    'Fewest Items',
    'Oldest',
];

const FeedSearchFilter = ({
    feedType,
    handleSortChange,
    handleTogglePack,
    handleToggleTrip,
    selectedTypes,
    selectedTrips,
    queryString,
    setSearchQuery,
    handleCreateClick,
}) => {
    const { currentTheme } = useTheme();
    const styles = useCustomStyles(loadStyles);
    const debouncedSearch = debounce((query) => setSearchQuery(query), 300);
    return (
        <View style={styles.filterContainer}>
            <View style={styles.searchContainer}>
                <RStack
                    space={3}
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                    <Input
                        size="$30"
                        placeholder={`Search ${feedType || 'Feed'}`}
                        onChangeText={(query) => debouncedSearch(query)}
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
                flex={1}
                flexWrap="wrap"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                padding={2}
                margin={2}
            >
                {feedType === 'public' && (
                    <RStack
                        style={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}
                    >
                        <Text
                            fontSize={18}
                            fontWeight="bold"
                            color={currentTheme.colors.textColor}
                        >
                            Packs
                        </Text>

                        <Switch
                            id="single-switch"
                            size="$1.5"
                            width="$4"
                            checked={selectedTypes.pack}
                            onCheckedChange={handleTogglePack}
                        >
                            <Switch.Thumb />
                        </Switch>
                        <Text
                            fontSize={18}
                            fontWeight="bold"
                            color={currentTheme.colors.textColor}
                        >
                            Trips
                        </Text>
                        <Switch
                            id="two-switch"
                            size="$1.5"
                            width="$4"
                            checked={selectedTrips.trip}
                            onCheckedChange={handleToggleTrip}
                        >
                            <Switch.Thumb />
                        </Switch>
                    </RStack>
                )}
                <RStack
                    style={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}
                >
                    <Text
                        fontSize={17}
                        fontWeight="bold"
                        color={currentTheme.colors.textColor}
                    >
                        Sort By:
                    </Text>
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
            <RSeparator style={{ margin: '10px 0' }} />
        </View>
    );
};

const loadStyles = (theme) => {
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
