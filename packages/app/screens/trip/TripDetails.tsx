import React, { useEffect } from 'react';
import { createParam } from 'solito';
import { TableContainer } from '../../components/pack_table/Table';
import { View } from 'react-native';
import { RText } from '@packrat/ui';
import { DetailsComponent } from '../../components/details';
import { Platform, StyleSheet } from 'react-native';
import { CLIENT_URL } from '@env';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useFetchSingleTrip, useTripWeather } from 'app/hooks/singletrips';
// import useWeather from './useWeather';
import {
  TableContainerComponent,
  WeatherCardComponent,
  TripCardComponent,
  ScoreContainerComponent,
  loadStyles,
} from './TripDetailsComponents';
import { useGEOLocationSearch } from 'hooks/geojson/useGEOLocationSearch';

const { useParam } = createParam();

export function TripDetails() {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const [tripId] = useParam('tripId');

  const { data, isLoading, error, isOwner, isError } = useFetchSingleTrip(tripId);
  const { weatherObject, weatherWeek } = useTripWeather(data);
  const link = `${CLIENT_URL}/trip/${tripId}`;

  if (isLoading) return <RText>Loading...</RText>;

  return (
    <View style={[styles.mainContainer, Platform.OS === 'web' ? { minHeight: '100vh' } : null]}>
      {!isError && (
        <DetailsComponent
          type="trip"
          data={data}
          isLoading={isLoading}
          error={error}
          additionalComps={
            <>
              <TableContainerComponent currentPack={data?.packs} />
              <WeatherCardComponent weatherObject={weatherObject} weatherWeek={weatherWeek} data={data} />
              <TripCardComponent data={data} weatherObject={weatherObject} currentTheme={currentTheme} />
              <ScoreContainerComponent data={data} isOwner={isOwner} />
            </>
          }
          link={link}
        />
      )}
    </View>
  );
}