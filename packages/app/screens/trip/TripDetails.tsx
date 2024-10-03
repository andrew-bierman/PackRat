import React, { useEffect } from 'react';
import { createParam } from 'app/hooks/params';
import { format } from 'date-fns';
import { View } from 'react-native';
import { RText, Details, RStack } from '@packrat/ui';
import { DetailsComponent } from '../../components/details';
import { Platform, FlatList, Dimensions, Text } from 'react-native';
import { CLIENT_URL } from '@packrat/config';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useResponsive from 'app/hooks/useResponsive';
import { useFetchSingleTrip, useTripWeather } from 'app/hooks/singletrips';
import ScoreContainer from 'app/components/ScoreContainer';
import { TableContainerComponent, loadStyles } from './TripDetailsComponents';
import { useTripId } from 'app/hooks/trips';
import Layout from 'app/components/layout/Layout';
import { TripMapCard } from 'app/components/trip/TripCards';

interface TripData {
  packs?: any;
  end_date?: string;
  start_date?: string;
  destination?: string;
  description?: string;
  [key: string]: any;
}

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
  const {
    data: rawData,
    isLoading,
    error,
    refetch,
    isOwner,
    isError,
  } = useFetchSingleTrip(tripId);

  const data = rawData as TripData;

  const { weatherObject } = useTripWeather(data);
  const { xxs, xs } = useResponsive();

  const link = `${CLIENT_URL}/trip/${tripId}`;

  // useEffect(() => {
  //   if (!tripId) return;
  //   dispatch(fetchSingleTrip(tripId));
  // }, [dispatch, tripId]);

  if (isLoading) return <RText>Loading...</RText>;

  if (isError) return <RText>There was an error</RText>;

  const errorProp = error instanceof Error ? error : new Error(error?.message);

  return (
    <Layout>
      <View
        style={{
          minHeight:
            Platform.OS == 'web' ? '100vh' : Dimensions.get('screen').height,
        }}
      >
        <DetailsComponent
          type="trip"
          data={data}
          isLoading={isLoading}
          error={errorProp}
          additionalComps={
            <View>
              <FlatList
                data={Object.entries(SECTION)}
                contentContainerStyle={{
                  paddingBottom: Platform.OS !== 'web' ? 350 : 0,
                }}
                keyExtractor={([key, val]) => val}
                renderItem={({ item }) => {
                  {
                    switch (item[1]) {
                      case SECTION.DESCRIPTION:
                        return (
                          <RStack style={{ width: xxs ? '20%' : '100%' }}>
                            <RText>{data?.description}</RText>
                            <Details
                              items={[
                                {
                                  key: 'start_date',
                                  label: 'Start Date',
                                  value: data?.start_date,
                                },
                                {
                                  key: 'end_date',
                                  label: 'End Date',
                                  value: data?.end_date,
                                },
                                {
                                  key: 'activity',
                                  label: 'Activity',
                                  value: data?.activity,
                                },
                                {
                                  key: 'destination',
                                  label: 'Destination',
                                  value: data?.destination,
                                },
                              ]}
                            />
                          </RStack>
                        );
                      case SECTION.TABLE:
                        return (
                          <TableContainerComponent currentPack={data?.packs} />
                        );
                      case SECTION.WEATHER:
                        return null; // TODO handle saved trip weather
                      case SECTION.TRIP:
                        console.log({ data });
                        return (
                          <TripMapCard
                            tripId={data.id}
                            initialBounds={data.bounds}
                          />
                        );
                      case SECTION.SCORE:
                        return (
                          <ScoreContainer
                            type="trip"
                            data={{
                              total_score: data?.scores?.totalScore || 0,
                            }}
                            isOwner={Boolean(isOwner)}
                          />
                        );
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
    </Layout>
  );
}
