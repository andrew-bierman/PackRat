import React, { useEffect } from 'react';

import { DetailsHeader } from '../../components/details/header';

import { useSearchParams } from 'expo-router';
import { TableContainer } from '../../components/pack_table/Table';
import { selectPackById } from '../../store/packsStore';

import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleTrip } from '../../store/singleTripStore';

import { Box, Text, View } from 'native-base';
import { DetailsComponent } from '../../components/details';
import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { CLIENT_URL } from '@env';
import ScoreContainer from '../../components/ScoreContainer';
import WeatherCard from '../../components/WeatherCard';
import TripCard from '../../components/TripCard';
import { FontAwesome5 } from '@expo/vector-icons';
import { convertPhotonGeoJsonToShape } from '../../utils/mapFunctions';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';
export function TripDetails() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const weatherObject = useSelector((state) => state.weather.weatherObject);
  const weatherWeek = useSelector((state) => state.weather.weatherWeek);
  console.log('trip detail');
  const dispatch = useDispatch();

  const { tripId } = useSearchParams();

  const link = `${CLIENT_URL}/trip/${tripId}`;

  useEffect(() => {
    if (!tripId) return;
    dispatch(fetchSingleTrip(tripId));
  }, [dispatch, tripId]);
  const states = useSelector((state) => state);

  const currentTrip = useSelector((state) => state.singleTrip.singleTrip);

  const user = useSelector((state) => state.auth.user);

  // check if user is owner of pack, and that pack and user exists
  const isOwner = currentTrip && user && currentTrip.owner_id === user._id;

  const isLoading = useSelector((state) => state.singleTrip.isLoading);
  const error = useSelector((state) => state.singleTrip.error);
  const isError = error !== null;

  if (isLoading) return <Text>Loading...</Text>;
  // console.log(currentTrip.osm_ref.geoJSON, 'geoJSON');
  return (
    <Box
      style={[
        styles.mainContainer,
        Platform.OS == 'web' ? { minHeight: '100vh' } : null,
      ]}
    >
      {!isError && (
        <>
          <DetailsComponent
            type="trip"
            data={currentTrip}
            isLoading={isLoading}
            error={error}
            additionalComps={
              <>
                <View>
                  <TableContainer currentPack={currentTrip?.packs} />
                </View>
                <View style={{ marginTop: '5%' }}>
                  <WeatherCard
                    weatherObject={
                      currentTrip?.weather
                        ? JSON?.parse(currentTrip?.weather)
                        : weatherObject
                    }
                    weatherWeek={weatherWeek}
                  />
                </View>
                {/* <View style={{marginTop:'5%', backgroundColor:'red'}}> */}
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
                  shape={currentTrip.geojson}
                  cords={
                    currentTrip?.weather
                      ? JSON?.parse(currentTrip?.weather)?.coord
                      : weatherObject?.coord
                  }
                />
                {/* </View> */}
                <View style={{ marginTop: '5%' }}>
                  <ScoreContainer
                    type="trip"
                    data={currentTrip}
                    isOwner={isOwner}
                  />
                </View>
              </>
            }
            link={link}
          />
        </>
      )}
    </Box>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mainContainer: {
      backgroundColor: currentTheme.colors.background,
      flexDirection: 'column',
      gap: 15,
      padding: [25, 25, 0, 25], // [top, right, bottom, left
      fontSize: 18,
      width: '100%',
    },
    packsContainer: {
      backgroundColor: currentTheme.colors.cardIconColor,
      flexDirection: 'column',
      minHeight: '100vh',

      padding: 25,
      fontSize: 26,
    },
    dropdown: {
      backgroundColor: currentTheme.colors.white,
    },
  };
};
