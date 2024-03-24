import { RScrollView, RStack } from '@packrat/ui';
import { theme } from '../../theme';
import TripCard from '../../components/TripCard';
import WeatherCard from '../../components/weather/WeatherCard';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState, useRef, useMemo } from 'react';
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

  const form = useCardTrip();
  const placesAutoCompleteRef = useRef({});
  const {
    dateRange,
    setDateRange,
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
  } = useTripsData();

  return (
    <RScrollView nestedScrollEnabled={true}>
      <RStack style={styles.mutualStyles}>
        {/* <MultiStepForm steps={steps} /> */}
        <RStack style={styles.container}>
          <TripCard
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
            form={form}
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
            form={form}
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
              dateRange={dateRange}
              search={currentDestination}
              weatherObject={weatherData}
              form={form}
            />
          </RStack>
        </RStack>
      </RStack>
    </RScrollView>
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
