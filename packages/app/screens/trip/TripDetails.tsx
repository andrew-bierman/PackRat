import React, { useEffect } from 'react';
import { createParam } from 'app/hooks/params';
import { format } from 'date-fns';
import { TableContainer } from '../../components/pack_table/Table';
import { View } from 'react-native';
import { RText, RStack } from '@packrat/ui';
import { DetailsComponent } from '../../components/details';
import { Platform, StyleSheet, FlatList, Dimensions, Text } from 'react-native';
import { CLIENT_URL } from '@env';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useFetchSingleTrip, useTripWeather } from 'app/hooks/singletrips';
import ScoreContainer from 'app/components/ScoreContainer';
// import useWeather from './useWeather';
import {
  TableContainerComponent,
  WeatherCardComponent,
  TripCardComponent,
  ScoreContainerComponent,
  loadStyles,
} from './TripDetailsComponents';
import { useTripId } from 'app/hooks/trips';

const SECTION = {
  DESCRIPTION: 'DESCRIPTION',
  TABLE: 'TABLE',
  WEATHER: 'WEATHER',
  TRIP: 'TRIP',
  SCORE: 'SCORE',
};

export function TripDetails() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const [tripId] = useTripId();

  // console.log("🚀 ~ file: TripDetails.js:34 ~ TripDetails ~ tripId:", tripId)
  const { data, isLoading, error, refetch, isOwner, isError } =
    useFetchSingleTrip(tripId);
  const { weatherObject, weatherWeek } = useTripWeather(data);

  const link = `${CLIENT_URL}/trip/${tripId}`;

  // useEffect(() => {
  //   if (!tripId) return;
  //   dispatch(fetchSingleTrip(tripId));
  // }, [dispatch, tripId]);

  if (isLoading) return <RText>Loading...</RText>;

  if (isError) return <RText>There was an error</RText>;

  return (
    <View
      style={[
        styles.mainContainer,
        Platform.OS == 'web'
          ? { minHeight: '100vh' }
          : { minHeight: Dimensions.get('screen').height },
      ]}
    >
          <DetailsComponent
            type="trip"
            data={data}
            isLoading={isLoading}
            error={error}
            additionalComps={
              <View>
                <FlatList
                  data={Object.entries(SECTION)}
                  contentContainerStyle={{ paddingBottom: Platform.OS !== 'web' ? 350 : 0 }}
                  keyExtractor={([key, val]) => val}
                  renderItem={({item}) => {
                    {
                      switch (item[1]) {
                        case SECTION.DESCRIPTION:
                          return <View style={{ marginBottom: '5%' }}>
                            {data?.description && (
                              <RStack>
                                <Text>Description: {data?.description}</Text>
                              </RStack>
                            )}
                            {data?.destination && (
                              <RStack>
                                <Text>Destination: {data?.destination}</Text>
                              </RStack>
                            )}
                            {data.start_date && (
                              <RStack>
                                <Text>
                                  Start Date:{' '}
                                  {format(new Date(data.start_date), 'MM/dd/yyyy')}
                                </Text>
                              </RStack>
                            )}
                            {data.end_date && (
                              <RStack>
                                <Text>
                                  End Date:{' '}
                                  {format(new Date(data.end_date), 'MM/dd/yyyy')}
                                </Text>
                              </RStack>
                            )}
                          </View>;
                        case SECTION.TABLE:
                          return <TableContainerComponent currentPack={data?.packs} />;
                        case SECTION.WEATHER:
                          return <WeatherCardComponent
                          weatherObject={weatherObject}
                          weatherWeek={weatherWeek}
                          data={data}
                        />;
                        case SECTION.TRIP:
                          return <TripCardComponent
                          data={data}
                          weatherObject={weatherObject}
                          currentTheme={currentTheme}
                        />;
                        case SECTION.SCORE:
                          return <ScoreContainer
                          type="trip"
                          data={data}
                          isOwner={isOwner}
                        />;
                        default:
                          return null;
                      }
                    }
                  }}
                />
              </View>
            }
            link={link}
          />
    </View>
  );
}
