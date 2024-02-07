import React, { useEffect, useMemo } from 'react';
import { DetailsHeader } from '../../components/details/header';
import { createParam } from 'solito';
import { TableContainer } from '../../components/pack_table/Table';
import { selectPackById } from '../../store/packsStore';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { RText } from '@packrat/ui';
import { DetailsComponent } from '../../components/details';
import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { CLIENT_URL } from '@env';
import ScoreContainer from '../../components/ScoreContainer';
import WeatherCard from '../../components/weather/WeatherCard';
import TripCard from '../../components/TripCard';
import { FontAwesome5 } from '@expo/vector-icons';
import { convertPhotonGeoJsonToShape } from '../../utils/mapFunctions';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useFetchSingleTrip, useTripWeather } from 'app/hooks/singletrips';
import { RootState } from 'store/store';

const { useParam } = createParam();

export function TripDetails() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  console.log('trip detail');
  const dispatch = useDispatch();
  const [tripId] = useParam('tripId');

  // console.log("🚀 ~ file: TripDetails.js:34 ~ TripDetails ~ tripId:", tripId)
  const { data, isLoading, error, refetch, isOwner, isError } =
    useFetchSingleTrip(tripId);

  const { weatherObject, weatherWeek } = useTripWeather(data);

  const link = `${CLIENT_URL}/trip/${tripId}`;

  // useEffect(() => {
  //   if (!tripId) return;
  //   dispatch(fetchSingleTrip(tripId));
  // }, [dispatch, tripId]);
  const states = useSelector((state: RootState) => state);

  const currentTrip = useSelector(
    (state: RootState) => state.singleTrip.singleTrip,
  );

  // const user = useSelector((state) => state.auth.user);

  // check if user is owner of pack, and that pack and user exists
  // const isOwner = currentTrip && user && currentTrip.owner_id === user.id;

  // const isLoading = useSelector((state) => state.singleTrip.isLoading);
  // const error = useSelector((state) => state.singleTrip.error);
  // const isError = error !== null;

  if (isLoading) return <RText>Loading...</RText>;
  // console.log(currentTrip.osm_ref.geoJSON, 'geoJSON');
  return (
    <View
      style={[
        styles.mainContainer,
        Platform.OS == 'web' ? { minHeight: '100vh' } : null,
      ]}
    >
      {!isError && (
        <>
          <DetailsComponent
            type="trip"
            data={data}
            isLoading={isLoading}
            error={error}
            additionalComps={
              <>
                <View>
                  <TableContainer currentPack={data?.packs} />
                </View>
                {weatherObject && weatherWeek ? (
                  <View style={{ marginTop: '5%' }}>
                    <WeatherCard
                      weatherObject={weatherObject}
                      weatherWeek={weatherWeek}
                    />
                  </View>
                ) : null}
                {/* <View style={{marginTop:'5%', backgroundColor:'red'}}> */}
                {data?.geojson?.features.length && (
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
                    shape={data.geojson}
                    cords={weatherObject?.coord}
                  />
                )}
                {/* </View> */}
                <View style={{ marginTop: '5%' }}>
                  <ScoreContainer type="trip" data={data} isOwner={isOwner} />
                </View>
              </>
            }
            link={link}
          />
        </>
      )}
    </View>
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
