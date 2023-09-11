import { Stack, Box, VStack } from 'native-base';
import { ScrollView, Platform, StyleSheet } from 'react-native';
import { Stack as Header } from 'expo-router';

import { theme } from '../../theme';
import TripCard from '../../components/TripCard';
import WeatherCard from '../../components/WeatherCard';

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { GearList } from '../../components/GearList';

import { SaveTripContainer } from '~/components/trip/createTripModal';

import TripDateRange from '~/components/trip/TripDateRange';
// import MultiStepForm from "../multi_step";
import { photonDetails } from '../../store/destinationStore';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';
export default function Trips() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const [shape, setShape] = useState({});
  const [parksData, setParksData] = useState();
  const [trails, setTrailsData] = useState();
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const dispatch = useDispatch();
  const searchResult = useSelector(
    (state) => state.search.selectedSearchResult,
  );
  // console.log(
  //   '🚀 ~ file: createTrip.js:37 ~ Trips ~ searchResult:',
  //   searchResult,
  // );

  const weatherObject = useSelector((state) => state.weather.weatherObject);
  const weatherWeek = useSelector((state) => state.weather.weatherWeek);

  const trailsObject = useSelector((state) => state.trails.trailNames);
  const parksObject = useSelector((state) => state.parks.parkNames);
  const photonDetailsStore = useSelector(
    (state) => state.destination.photonDetails,
  );
  const selectedMap = useSelector((state) => state.maps.selectedMap);

  useEffect(() => {
    if (photonDetailsStore !== shape) {
      setShape(photonDetailsStore);
    } else if (selectedMap.geojson && selectedMap.geojson !== shape) {
      setShape(selectedMap.geojson);
    }
  }, [photonDetailsStore, selectedMap]);

  // console.log(
  //   '🚀 ~ file: createTrip.js:49 ~ Trips ~ photonDetailsStore:',
  //   photonDetailsStore,
  // );
  useEffect(() => {
    setTrailsData(trailsObject);
  }, [trailsObject]);

  useEffect(() => {
    setParksData(parksObject);
  }, [parksObject]);

  useEffect(() => {
    if (searchResult?.properties) {
      const matchPhotonFormattingForData = {
        properties: {
          osm_id: searchResult.properties?.osm_id,
          osm_type: searchResult.properties?.osm_type,
        },
      };
      dispatch(photonDetails(matchPhotonFormattingForData));
    }
  }, [searchResult]);
  const steps = [
    {
      name: 'Step 1',
      component: () => (
        <TripCard
          title="Where are you heading?"
          isSearch={true}
          Icon={() => (
            <FontAwesome
              name="map"
              size={20}
              color={theme.colors.cardIconColor}
            />
          )}
        />
      ),
      sidebarData: {
        title: 'Where are you heading?',
        Icon: () => (
          <FontAwesome
            name="map"
            size={20}
            color={theme.colors.cardIconColor}
          />
        ),
      },
    },
    {
      name: 'Step 2',
      component: () => (
        <WeatherCard weatherObject={weatherObject} weatherWeek={weatherWeek} />
      ),
    },
    {
      name: 'Step 3',
      component: () => (
        <TripCard
          title="Nearby Trails"
          value="Trail List"
          isTrail={true}
          data={trails || []}
          Icon={() => (
            <FontAwesome5
              name="hiking"
              size={20}
              color={theme.colors.cardIconColor}
            />
          )}
        />
      ),
    },
    {
      name: 'Step 4',
      component: () => (
        <TripCard
          title="Nearby Parks"
          value="Parks List"
          data={parksData}
          Icon={() => (
            <FontAwesome5
              name="mountain"
              size={20}
              color={theme.colors.cardIconColor}
            />
          )}
        />
      ),
    },
    {
      name: 'Step 5',
      component: GearList,
    },
    {
      name: 'Step 6',
      component: () => (
        <TripDateRange dateRange={dateRange} setDateRange={setDateRange} />
      ),
    },
    {
      name: 'Step 7',
      component: () => (
        <TripCard
          Icon={() => (
            <FontAwesome5
              name="route"
              size={24}
              color={theme.colors.cardIconColor}
            />
          )}
          title="Map"
          isMap={true}
        />
      ),
    },
    {
      name: 'Step 8',
      component: () => <SaveTripContainer dateRange={dateRange} />,
    },
  ];

  return (
    <ScrollView nestedScrollEnabled={true}>
      <VStack>
        {/* <MultiStepForm steps={steps} /> */}
        <Box style={styles.mutualStyles}>
          <Stack m={[0, 0, 12, 16]} style={{ gap: 25 }}>
            <TripCard
              title="Where are you heading?"
              isSearch={true}
              Icon={() => (
                <FontAwesome
                  name="map"
                  size={20}
                  color={currentTheme.colors.cardIconColor}
                />
              )}
            />

            <WeatherCard
              weatherObject={weatherObject}
              weatherWeek={weatherWeek}
            />

            <TripCard
              title="Nearby Trails"
              value="Trail List"
              isTrail={true}
              data={trails || []}
              Icon={() => (
                <FontAwesome5
                  name="hiking"
                  size={20}
                  color={currentTheme.colors.cardIconColor}
                />
              )}
            />

            <TripCard
              title="Nearby Parks"
              value="Parks List"
              isPark={true}
              data={parksData}
              Icon={() => (
                <FontAwesome5
                  name="mountain"
                  size={20}
                  color={currentTheme.colors.cardIconColor}
                />
              )}
            />
            <GearList />
            <TripDateRange dateRange={dateRange} setDateRange={setDateRange} />

            <TripCard
              Icon={() => (
                <FontAwesome5
                  name="route"
                  size={24}
                  color={currentTheme.colors.cardIconColor}
                />
              )}
              title="Map"
              isMap={true}
              shape={shape}
            />
            <Box>
              <SaveTripContainer dateRange={dateRange} />
            </Box>
          </Stack>
        </Box>

        {/* <Footer /> */}
      </VStack>
    </ScrollView>
  );
}

const loadStyles = () => ({
  mutualStyles: {
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
});
