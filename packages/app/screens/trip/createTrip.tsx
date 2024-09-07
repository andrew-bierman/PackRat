import React from 'react';
import { RStack } from '@packrat/ui';
import { ScrollView } from 'react-native';
import { theme } from '../../theme';
import { useRef } from 'react';
import { GearList } from '../../components/GearList/GearList';
import { SaveTripContainer } from 'app/components/trip/createTripModal';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useCreateTripForm } from 'app/hooks/trips/useCreateTripForm';
import { useTripsData } from './useTripsData';
import {
  TripMapCard,
  TripParkCard,
  TripSearchCard,
  TripTrailCard,
  TripActivityCard,
  TripDateRangeCard,
} from 'app/components/trip/TripCards';
import { WeatherData } from 'app/components/weather/WeatherData';

function Trips() {
  const styles = useCustomStyles(loadStyles);

  const placesAutoCompleteRef = useRef({});
  const {
    currentDestination,
    photonDetails,
    isPhotonLoading,
    hasPhotonError,
    parksData,
    filteredTrails,
    latLng,
  } = useTripsData();

  const { isValid, setDateRange, togglePlace, tripStore, setTripValue } =
    useCreateTripForm(currentDestination, photonDetails);

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
          {latLng ? <WeatherData latLng={latLng} /> : null}
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
          <TripActivityCard
            selectedValue={tripStore.type}
            onChange={(activity) => setTripValue('type', activity)}
          />
          <TripDateRangeCard
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
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
    padding: 20,
  },
});

export default Trips;
