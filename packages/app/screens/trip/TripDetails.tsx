import React, { useEffect } from 'react';
import { createParam } from 'solito';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { RText } from '@packrat/ui';
import { DetailsComponent } from '../../components/details';
import { Platform, StyleSheet } from 'react-native';
import { CLIENT_URL } from '@env';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useFetchSingleTrip, useTripWeather } from 'app/hooks/singletrips';
import { RootState } from 'store/store';
// import useWeather from './useWeather';
import {
  TableContainerComponent,
  WeatherCardComponent,
  TripCardComponent,
  ScoreContainerComponent,
  loadStyles,
} from './TripDetailsComponents';

const { useParam } = createParam();

export function TripDetails() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
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

  const currentTrip = useSelector((state: RootState) => state.singleTrip.singleTrip);

  // const user = useSelector((state) => state.auth.user);

  // check if user is owner of pack, and that pack and user exists
  // const isOwner = currentTrip && user && currentTrip.owner_id === user._id;

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
                <TableContainerComponent currentPack={data?.packs} />
                <WeatherCardComponent
                  weatherObject={weatherObject}
                  weatherWeek={weatherWeek}
                  data={data}
                />
                <TripCardComponent
                  data={data}
                  weatherObject={weatherObject}
                  currentTheme={currentTheme}
                />
                <ScoreContainerComponent data={data} isOwner={isOwner} />
              </>
            }
            link={link}
          />
        </>
      )}
    </View>
  );
}
