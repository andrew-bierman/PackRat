import React from 'react';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { TripCard } from 'app/components/trip/TripCard';
import WeatherCard from 'app/components/weather/WeatherCard';
import { GearList } from 'app/components/GearList/GearList';
import { SaveTripContainer } from 'app/components/trip/createTripModal';
import TripDateRange from 'app/components/trip/TripDateRange';
import useTheme from 'app/hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useFetchWeather, useFetchWeatherWeak } from 'app/hooks/weather';
import { useParks } from 'app/hooks/parks';

const steps = [
  {
    name: 'Step 1',
    component: () => (
      <TripCard
        title="Where are you heading?"
        isSearch={true}
        Icon={() => (
          <FontAwesome
            name="map"
            size={20}
            color={theme.colors.cardIconColor}
          />
        )}
      />
    ),
    sidebarData: {
      title: 'Where are you heading?',
      Icon: () => (
        <FontAwesome name="map" size={20} color={theme.colors.cardIconColor} />
      ),
    },
  },
  {
    name: 'Step 2',
    component: () => (
      <WeatherCard weatherObject={weatherData} weatherWeek={weatherWeekData} />
    ),
  },
  {
    name: 'Step 3',
    component: () => (
      <TripCard
        title="Nearby Trails"
        value="Trail List"
        isTrail={true}
        data={trails || []}
        Icon={() => (
          <FontAwesome5
            name="hiking"
            size={20}
            color={theme.colors.cardIconColor}
          />
        )}
      />
    ),
  },
  {
    name: 'Step 4',
    component: () => (
      <TripCard
        title="Nearby Parks"
        value="Parks List"
        data={parksData}
        Icon={() => (
          <FontAwesome5
            name="mountain"
            size={20}
            color={theme.colors.cardIconColor}
          />
        )}
      />
    ),
  },
  {
    name: 'Step 5',
    component: GearList,
  },
  {
    name: 'Step 6',
    component: () => (
      <TripDateRange dateRange={dateRange} setDateRange={setDateRange} />
    ),
  },
  {
    name: 'Step 7',
    component: () => (
      <TripCard
        Icon={() => (
          <FontAwesome5
            name="route"
            size={24}
            color={theme.colors.cardIconColor}
          />
        )}
        title="Map"
        isMap={true}
      />
    ),
  },
  {
    name: 'Step 8',
    component: () => <SaveTripContainer dateRange={dateRange} />,
  },
];
