import _ from 'lodash';
import { useEffect, useState, useRef, useMemo } from 'react';
import { ScrollView, Touchable, Pressable } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { FormProvider } from 'react-hook-form';

import { RStack, RText } from '@packrat/ui';
import { theme } from '../../theme';
import TripCard from '../../components/TripCard';
import WeatherCard from '../../components/weather/WeatherCard';
import { GearList } from '../../components/GearList/GearList';
import { SaveTripContainer } from 'app/components/trip/createTripModal';
import TripDateRange from 'app/components/trip/TripDateRange';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useCardTrip } from 'app/hooks/trips/useTripCard';
import { useTripsData } from './useTripsData';


export default function Trips() {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const [trails, setTrailsData] = useState();

  // const form = useCardTrip();
  const placesAutoCompleteRef = useRef({});
  const {
    dateRange,
    setDateRange,
    handleSubmit,
    packId,
    setPackId,
    currentDestination,
    photonDetails,
    weatherData,
    weatherLoading,
    weatherError,
    weatherWeekData,
    weekWeatherLoading,
    weekWeatherError,
    parksData,
    filteredTrails,
    formErrors,
    form,
    currentPark,
    currentTrail,
    togglePlace
  } = useTripsData();

  const parkTrailPlace = {
    currentPark,
    currentDestination,
    togglePlace
  };
  console.log(formErrors, 'formErrors');

  useEffect(() => {
    console.log(dateRange, 'date range changed');
  }, [dateRange]);

  const isOsmMissing = formErrors.osm;
  console.log(isOsmMissing, formErrors, 'whatttt')

  const sref = useRef(null);

  return (
    <ScrollView nestedScrollEnabled={true} ref={sref} >
      <FormProvider {...form}>
        <RStack style={styles.mutualStyles}>
          {/* <MultiStepForm steps={steps} /> */}
          <RStack style={styles.container}>
            <TripCard
              showError
              isError={isOsmMissing}
              errorMessage="Please select a destination"
              title="Where are you heading?"
              isSearch={true}
              searchRef={placesAutoCompleteRef}
              Icon={() => (
                <FontAwesome
                  name="map"
                  size={20}
                  color={currentTheme.colors.cardIconColor}
                />
              )}
            />
            {!weekWeatherError &&
              !weatherError &&
              !weatherLoading &&
              !weekWeatherLoading && (
                <WeatherCard
                  weatherObject={weatherData}
                  weatherWeek={weatherWeekData}
                />
              )}
            <TripCard
              title="Nearby Trails"
              value="Trail List"
              isTrail={true}
              form={parkTrailPlace}
              data={filteredTrails || []}
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
              form={parkTrailPlace}
              Icon={() => (
                <FontAwesome5
                  name="mountain"
                  size={20}
                  color={currentTheme.colors.cardIconColor}
                />
              )}
            />
            <GearList setPackId={setPackId} />
            <TripDateRange dateRange={dateRange} setDateRange={setDateRange} />
            {!photonDetails?.IsError && !photonDetails?.isLoading && (
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
                shape={photonDetails}
              />
            )}
            <RStack>
              <SaveTripContainer
                handleSubmit={handleSubmit}
                dateRange={dateRange}
                search={currentDestination}
                weatherObject={weatherData}
                form={parkTrailPlace}
              />
            </RStack>
          </RStack>
        </RStack>
      </FormProvider>
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
