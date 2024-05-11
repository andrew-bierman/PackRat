import React from 'react';
import { RStack } from '@packrat/ui';
import { ScrollView } from 'react-native';
import { theme } from '../../theme';
import WeatherCard from '../../components/weather/WeatherCard';
import { useState, useRef } from 'react';
import { GearList } from '../../components/GearList/GearList';
import { SaveTripContainer } from 'app/components/trip/createTripModal';
import TripDateRange from 'app/components/trip/TripDateRange';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useCreateTripForm } from 'app/hooks/trips/useCreateTripForm';
import { useTripsData } from './useTripsData';
import {
  TripMapCard,
  TripParkCard,
  TripSearchCard,
  TripTrailCard,
} from 'app/components/trip/TripCards';
import { MultiStepForm } from 'components/MultistepForm';

export default function Trips() {
  const styles = useCustomStyles(loadStyles);

  const placesAutoCompleteRef = useRef({});
  const {
    currentDestination,
    photonDetails,
    isPhotonLoading,
    hasPhotonError,
    weatherData,
    weatherLoading,
    weatherError,
    weatherWeekData,
    weekWeatherLoading,
    weekWeatherError,
    parksData,
    filteredTrails,
  } = useTripsData();


  const { isValid, setDateRange, togglePlace, tripStore } = useCreateTripForm(
    weatherData,
    currentDestination,
    photonDetails,
  );


  const dateRange = {
    start_date: tripStore.start_date,
    end_date: tripStore.end_date,
  };

  return (
    <ScrollView nestedScrollEnabled={true}>
      <RStack style={styles.mutualStyles}>
        {/* <MultiStepForm steps={steps} /> */}
        <RStack style={styles.container}>
          <TripSearchCard searchRef={placesAutoCompleteRef} />
          {!weekWeatherError &&
            !weatherError &&
            !weatherLoading &&
            !weekWeatherLoading && (
              <WeatherCard
                weatherObject={weatherData}
                weatherWeek={weatherWeekData}
              />
            )}
          <TripTrailCard
            data={filteredTrails || []}
            onToggle={(trail) => togglePlace('trail', trail)}
            selectedValue={tripStore.trail}
          />
          <TripParkCard
            data={parksData || []}
            onToggle={(park) => togglePlace('park', park)}
            selectedValue={tripStore.park}
          />
          <GearList />
          <TripDateRange dateRange={dateRange} setDateRange={setDateRange} />
          {!hasPhotonError && photonDetails ? (
            <TripMapCard isLoading={isPhotonLoading} shape={photonDetails} />
          ) : null}
          {isValid && (
            <RStack>
              <SaveTripContainer tripStore={tripStore} />
            </RStack>
          )}
        </RStack>
      </RStack>
    </ScrollView>
  );
}

const loadStyles = () => ({
  mutualStyles: {
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    paddingBottom: 30,
  },
  container: {
    gap: 50,
    padding: 50,
  },
});
