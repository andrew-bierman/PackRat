import React from 'react';
import { FlatList, View, ScrollView, Platform } from 'react-native';
import Card from '../../components/feed/FeedCard';
import useCustomStyles from '../../hooks/useCustomStyles';
import FeedSearchFilter from 'app/components/feed/FeedSearchFilter';
import { useFeedScreen } from '../../hooks/feed';
import { RefreshControl } from 'react-native';
import { RText } from '@packrat/ui';

const Feed = ({ feedType = 'public' }) => {
  const styles = useCustomStyles(loadStyles);
  const {
    arrayData,
    error,
    isLoading,
    refreshing,
    onRefresh,
    handleTogglePack,
    handleToggleTrip,
    handleSortChange,
    handleCreateClick,
    selectedTypes,
    searchQuery,
    setSearchQuery,
    urlPath,
    errorText,
    data,
    queryString,
    ERROR_MESSAGES,
  } = useFeedScreen(feedType);
  const renderData = () => {
    const feedSearchFilterComponent = (
      <FeedSearchFilter
        feedType={feedType}
        handleSortChange={handleSortChange}
        handleTogglePack={handleTogglePack}
        handleToggleTrip={handleToggleTrip}
        selectedTypes={selectedTypes}
        queryString={queryString}
        setSearchQuery={setSearchQuery}
        handleCreateClick={handleCreateClick}
      />
    );
    // return Platform.OS === 'web' ? (
    //   <ScrollView
    //     showsHorizontalScrollIndicator={false}
    //     contentContainerStyle={{ flex: 1, paddingBottom: 10 }}
    //     refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //     }
    //   >
    //     <View style={styles.cardContainer}>
    //       {/* {console.log({ data })} */}
    //       {feedSearchFilterComponent}
    //       {data?.map((item) => (
    //         <Card key={item?._id} type={item?.type} {...item} />
    //       ))}
    //     </View>
    //   </ScrollView>
    // ) : (
    return (
      <View style={{ flex: 1, paddingBottom: 10 }}>
        <FlatList
          data={data}
          horizontal={false}
          numColumns={Platform.OS === 'web' ? 4 : 1}
          keyExtractor={(item) => item?._id + item?.type}
          renderItem={({ item }) => (
            <Card key={item?._id} type={item?.type} {...item} />
          )}
          ListHeaderComponent={() => feedSearchFilterComponent}
          ListEmptyComponent={() => <RText>{ERROR_MESSAGES[feedType]}</RText>}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          maxToRenderPerBatch={2}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    );
  };

  return <View style={styles.mainContainer}>{renderData()}</View>;
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

export default Feed;
