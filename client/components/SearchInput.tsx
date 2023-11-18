import { Platform, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RStack, RInput, RButton, RText, RScrollView, RIconButton } from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import { fetchTrails } from '../store/trailsStore';
import { fetchParks } from '../store/parksStore';
import {
  setSelectedSearchResult,
  clearSearchResults,
  fetchPhotonSearchResults,
} from '../store/searchStore';
import { fetchWeather, fetchWeatherWeek } from '../store/weatherStore';
import useCustomStyles from '~/hooks/useCustomStyles';

export const SearchInput = ({ onSelect, placeholder }) => {
  const [searchString, setSearchString] = useState('');
  const [isLoadingMobile, setIsLoadingMobile] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState('');

  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const searchResults =
    useSelector((state) => state.search.searchResults) || [];

  const selectedSearchResult =
    useSelector((state) => state.search.selectedSearchResult) || {};

  const [showSearchResults, setShowSearchResults] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setShowSearchResults(searchString.length > 0);

    const timeout = setTimeout(() => {
      if (!searchString) return;
      dispatch(fetchPhotonSearchResults(searchString));
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchString, dispatch]);

  const getTrailsParksAndWeatherDetails = async () => {
    if (
      !selectedSearchResult ||
      Object.keys(selectedSearchResult).length === 0
    ) {
      return;
    }

    setIsLoadingMobile(true);

    const {
      geometry: { coordinates },
    } = selectedSearchResult;
    const [lon, lat] = coordinates;

    if (!lat || !lon) {
      setIsLoadingMobile(false);
      return;
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

    setSelectedSearch(name);
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
            style={{
              position: 'absolute',
              height: '100%',
              alignSelf: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              fontSize: 20,
            }}
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
              width="10px"
            >
              <MaterialIcons name="close" />
            </RButton>
          )}
        </RStack>

        <RStack style={{ position: 'relative' }}>
          {showSearchResults && searchResults?.length > 0 && (
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
              <View role="list" style={{width:"100%", gap: "8px", padding: "8px"}}>
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
                    <RStack style={{flexDirection:"row"}}>
                      <RText fontWeight="400">
                        {result.properties.name}
                      </RText>
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
              </View>
            </RScrollView>
          )}
        </RStack>
      </RStack>
    </RStack>
  ) : isLoadingMobile ? (
    <RText>Loading...</RText>
  ) : (
    <RStack style={{width:"100%", alignSelf: "center"}}>
      <RInput
        onChangeText={(text) => {
          setSearchString(text);
        }}
        placeholder="Search"
        style={{
          width:"100%",
          borderRadius:"4",
          padding:"16px 8px",
          backgroundColor: "white",
        }}
        value={searchString}
        fontSize={14}
      />
      <RIconButton
        backgroundColor="transparent"
        icon={<MaterialIcons name="search" size={24} color="gray"/>}
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
          <View role="list" style={{width:"100%"}}>
            {searchResults.map((result, i) => (
              <Pressable
                key={`result + ${i}`}
                role="listitem"
                onPress={() => {
                  handleSearchResultClick(result, i);
                }}
              >
                <RStack style={{flexDirection: "row"}}>
                  <RText fontWeight="400">
                    {result.properties.name}
                  </RText>
                  <RText
                    color="gray"
                    textTransform={'capitalize'}
                  >
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
});
