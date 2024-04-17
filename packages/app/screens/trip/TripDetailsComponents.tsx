import React, { useEffect } from 'react';
import { TableContainer } from '../../components/pack_table/Table';
import { View } from 'react-native';
import ScoreContainer from '../../components/ScoreContainer';
import WeatherCard from '../../components/weather/WeatherCard';
import TripCard from '../../components/trip/TripCard';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../theme';
import { TripMapCard } from 'app/components/trip/TripCards';

const TableContainerComponent = ({ currentPack }) => (
  <View>
    <TableContainer currentPack={currentPack} />
  </View>
);

const WeatherCardComponent = ({ weatherObject, weatherWeek, data }) => (
  <View style={{ marginTop: '5%' }}>
    <WeatherCard
      weatherObject={data?.weather ? JSON?.parse(data?.weather) : weatherObject}
      weatherWeek={weatherWeek}
    />
  </View>
);

const TripCardComponent = ({ data, weatherObject, currentTheme }) =>
  data?.geojson?.features?.length && (
    // data?.geojson && (
    <TripMapCard
      shape={data.geojson}
      // cords={
      //   data?.weather ? JSON?.parse(data?.weather)?.coord : weatherObject?.coord
      // }
    />
  );

const ScoreContainerComponent = ({ data, isOwner }) => (
  <View style={{ marginTop: '5%' }}>
    <ScoreContainer type="trip" data={data} isOwner={isOwner} />
  </View>
);

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mainContainer: {
      backgroundColor: currentTheme.colors.background,
      flexDirection: 'column',
      gap: 15,
      padding: [25, 25, 0, 25], // [top, right, bottom, left
      fontSize: 18,
      width: '100%',
    },
    packsContainer: {
      backgroundColor: currentTheme.colors.cardIconColor,
      flexDirection: 'column',
      minHeight: '100vh',

      padding: 25,
      fontSize: 26,
    },
    dropdown: {
      backgroundColor: currentTheme.colors.white,
    },
  };
};

export {
  TableContainerComponent,
  WeatherCardComponent,
  TripCardComponent,
  ScoreContainerComponent,
  loadStyles,
};
