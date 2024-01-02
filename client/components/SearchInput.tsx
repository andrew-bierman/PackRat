import { Platform, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  RStack,
  RInput,
  RButton,
  RText,
  RScrollView,
  RIconButton,
} from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import { fetchTrails } from '../store/trailsStore';
import { fetchParks } from '../store/parksStore';
import {
  setSelectedSearchResult,
  clearSearchResults,
  fetchPhotonSearchResults,
} from '../store/searchStore';
import {
  fetchWeather,
  fetchWeatherWeek,
  setLatLng,
  setSearchResult,
} from '../store/weatherStore';
import useCustomStyles from '~/hooks/useCustomStyles';
import { setFilteredTrails, setTrails } from '~/store/trailsStore_copy'; // REMOVE
import useTrails from '~/hooks/trails';
import useParks from '~/hooks/parks';
import { usePhotonDetail } from '~/hooks/photonDetail';
import { useFetchWeather, useFetchWeatherWeak } from '~/hooks/weather';

export const SearchInput = ({ onSelect, placeholder }) => {
  const [searchString, setSearchString] = useState('');

  const [isLoadingMobile, setIsLoadingMobile] = useState(false);
  const { selectedSearch } = useSelector((state) => state.weather);
  // const [selectedSearch, setSelectedSearch] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { refetch, data, isError, isLoading } = usePhotonDetail(
    searchString,
    showSearchResults,
  );

  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles());
  // const [selectedSearchResult, setSelectedSearchResult] = useState({});
  const searchResults =
    useSelector((state) => state.search.searchResults) || [];

  const [latLng, setLatLng] = useState({});

  const selectedSearchResult =
    useSelector((state) => state.search.selectedSearchResult) || {};

  const dispatch = useDispatch();

  useEffect(() => {
    setShowSearchResults(searchString.length > 0);
    const timeout = setTimeout(() => {
      if (!searchString) return;
      refetch();
      dispatch(fetchPhotonSearchResults(searchString));
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchString, dispatch]);

  const getTrailsParksAndWeatherDetails = async () => {
    console.log(selectedSearchResult, 'selected search result');
    if (
      !selectedSearchResult ||
      Object.keys(selectedSearchResult).length === 0
    ) {
      return;
    }

    setIsLoadingMobile(true);

    const {
      geometry: { coordinates },
      properties,
    } = selectedSearchResult;
    const [lon, lat] = coordinates;
    if (!lat || !lon) {
      setIsLoadingMobile(false);
      return;
    } else {
      dispatch(setLatLng({ lat, lon }));
    }

    try {
      await Promise.all([
        dispatch(fetchTrails({ lat, lon, selectedSearch })),
        dispatch(fetchParks({ lat, lon, selectedSearch })),
        dispatch(fetchWeather({ lat, lon })),
        dispatch(fetchWeatherWeek({ lat, lon })),
      ]);
    } catch (error) {
      console.error(error);
    }

    setIsLoadingMobile(false);
  };

  useEffect(() => {

    const timeout = setTimeout(getTrailsParksAndWeatherDetails, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedSearch, selectedSearchResult, dispatch]);

  const handleSearchResultClick = (result, index) => {
    const {
      properties: { name, osm_id },
    } = result;
    // console.log(result, 'line 136');
    dispatch(setSearchResult(name));
    setSearchString(name);
    setShowSearchResults(false);
    dispatch(setSelectedSearchResult(result));

    if (onSelect) {
      onSelect(result);
    }
  };

  return Platform.OS === 'web' ? (
    <RStack style={styles.container}>
      <RStack position="relative" height="auto">
        <RStack
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <RInput
            style={{
              paddingLeft: '35px',
              paddingRight: '55px',
            }}
            placeholder={placeholder ?? 'Search'}
            onChangeText={(text) => {
              setSearchString(text);
            }}
            value={searchString}
          />
          <MaterialIcons
            name="search"
            style={styles.search}
          />
          {searchString && (
            <RButton
              onPress={() => {
                setShowSearchResults(false);
                setSearchString('');
                dispatch(clearSearchResults());
              }}
              style={{
                position: 'absolute',
                right: 1,
                backgroundColor: 'transparent',
              }}
              width={40}
            >
              <MaterialIcons name="close" style={{ fontSize: 20 }} />
            </RButton>
          )}
        </RStack>

        <RStack style={{ position: 'relative' }}>
          {data && data?.length > 0 && (
            <RScrollView
              position="absolute"
              top="100%"
              left="0"
              right="0"
              maxHeight={150}
              borderWidth={1}
              borderRadius={12}
              backgroundColor={currentTheme.colors.white}
              showsVerticalScrollIndicator={false}
              zIndex={20000}
            >
              <RStack space={2} w="100%">
                {searchResults.map((result, i) => (
                  <RStack
                    key={`result + ${i}`}
                    role="listitem"
                    onPress={() => {
                      handleSearchResultClick(result, i);
                    }}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <RStack style={{ flexDirection: 'row' }}>
                      <RText fontWeight="400">{result.properties.name}</RText>
                      <RText
                        style={{
                          color: 'gray',
                          opacity: '100',
                          textTransform: 'capitalize',
                        }}
                      >
                        {result.properties.osm_value}
                      </RText>
                    </RStack>
                  </RStack>
                ))}
              </RStack>
            </RScrollView>
          )}
        </RStack>

      </RStack>
    </RStack>
  ) : isLoadingMobile ? (
    <RText>Loading...</RText>
  ) : (
    <RStack style={{ width: '100%', alignSelf: 'center' }}>
      <RInput
        onChangeText={(text) => {
          setSearchString(text);
        }}
        placeholder="Search"
        style={{
          width: '100%',
          borderRadius: '4',
          padding: '16px 8px',
          backgroundColor: 'white',
        }}
        value={searchString}
        fontSize={14}
      />
      <RIconButton
        backgroundColor="transparent"
        icon={<MaterialIcons name="search" size={24} color="gray" />}
      />

      {showSearchResults && searchResults?.length > 0 && (
        <RScrollView
          position="absolute"
          top="100%"
          left="0"
          right="0"
          maxHeight="100"
          borderWidth={1}
          borderColor="gray.200"
          borderRadius={12}
          backgroundColor={currentTheme.colors.white}
          showsVerticalScrollIndicator={false}
          zIndex={10}
        >
          <View role="list" style={{ width: '100%' }}>
            {searchResults.map((result, i) => (
              <Pressable
                key={`result + ${i}`}
                role="listitem"
                onPress={() => {
                  handleSearchResultClick(result, i);
                }}
              >
                <RStack style={{ flexDirection: 'row' }}>
                  <RText fontWeight="400">{result.properties.name}</RText>
                  <RText color="gray" textTransform={'capitalize'}>
                    {result.properties.osm_value}
                  </RText>
                </RStack>
              </Pressable>
            ))}
          </View>
        </RScrollView>
      )}
    </RStack>
  );
};

const loadStyles = () => ({
  container: {
    marginTop: 20,
    marginBottom: 15,
    maxWidth: '400px',
  },

  search: {
    position: 'absolute',
    left: 10,
    height: '100%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  }
});
