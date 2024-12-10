import React from 'react';
import { RStack } from '@packrat/ui';
import { FlatList, ScrollView } from 'react-native';
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
import { useFlatList } from 'app/hooks/useFlatList';

const SECTIONS = {
  SEARCH: 'SEARCH',
  WEATHER: 'WEATHER',
  TRAIL: 'TRAIL',
  PARK: 'PARK',
  PACK: 'PACK',
  ACTIVITY: 'ACTIVITY',
  DATE: 'DATE',
  MAP: 'MAP',
  FOOTER: 'FOOTER',
};

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

  const { flatListData, keyExtractor, renderItem } = useFlatList(SECTIONS, {
    [SECTIONS.SEARCH]: <TripSearchCard searchRef={placesAutoCompleteRef} />,
    [SECTIONS.WEATHER]: latLng ? <WeatherData latLng={latLng} /> : null,
    [SECTIONS.TRAIL]: (
      <TripTrailCard
        data={filteredTrails || []}
        onToggle={(trail) => togglePlace('trails', trail)}
        selectedValue={tripStore.trails?.map?.(({ id }) => id) || []}
      />
    ),
    [SECTIONS.PARK]: (
      <TripParkCard
        data={parksData || []}
        onToggle={(park) => togglePlace('parks', park)}
        selectedValue={tripStore.parks?.map?.(({ id }) => id) || []}
      />
    ),
    [SECTIONS.PACK]: <GearList />,
    [SECTIONS.ACTIVITY]: (
      <TripActivityCard
        selectedValue={tripStore.activity}
        onChange={(activity) => setTripValue('activity', activity)}
      />
    ),
    [SECTIONS.DATE]: (
      <TripDateRangeCard dateRange={dateRange} setDateRange={setDateRange} />
    ),
    [SECTIONS.MAP]:
      !hasPhotonError && photonDetails ? (
        <TripMapCard
          isLoading={isPhotonLoading}
          shape={photonDetails}
          onVisibleBoundsChange={(bounds) => {
            setTripValue('bounds', bounds);
          }}
        />
      ) : null,
    [SECTIONS.FOOTER]: isValid && (
      <RStack style={{ marginBottom: 20 }}>
        <SaveTripContainer tripStore={tripStore} />
      </RStack>
    ),
  });

  return (
    <ScrollView nestedScrollEnabled={true}>
      <RStack style={styles.mutualStyles}>
        <RStack style={styles.container}>
          <FlatList
            data={flatListData}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </RStack>
      </RStack>
    </ScrollView>
  );
}

const loadStyles = () => {
  const { currentTheme } = useTheme();

  return {
    mutualStyles: {
      backgroundColor: currentTheme.colors.background,
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      paddingBottom: 30,
    },
    container: {
      gap: 50,
      padding: 20,
    },
  };
};

export default Trips;
