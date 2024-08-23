import React from 'react';
import { View } from 'react-native';
import ScoreContainer from '../../components/ScoreContainer';
import WeatherCard from '../../components/weather/WeatherCard';
import { TripMapCard } from 'app/components/trip/TripCards';
import { useFetchSinglePack, TableContainer } from 'app/modules/pack';
import { RSkeleton, RText } from '@packrat/ui';

const TableContainerComponent = ({ currentPack }) => {
  const { data, isLoading } = useFetchSinglePack(currentPack.id || currentPack);

  if (isLoading) return <RSkeleton style={{}} />;

  if (data === null) return <RText>Pack Not Found</RText>;

  return (
    <View>
      <TableContainer currentPack={data} />
    </View>
  );
};

const WeatherCardComponent = ({ weatherObject, weatherWeek, data }) => (
  <View style={{ marginTop: '5%', marginBottom: '1%' }}>
    <WeatherCard
      weatherObject={data?.weather ? JSON?.parse(data?.weather) : weatherObject}
      weatherWeek={weatherWeek}
    />
  </View>
);

const TripCardComponent = ({ data, weatherObject, currentTheme }) =>
  (data?.geojson?.features?.length && (
    // data?.geojson && (
    <TripMapCard
      shape={data.geojson}
      // cords={
      //   data?.weather ? JSON?.parse(data?.weather)?.coord : weatherObject?.coord
      // }
    />
  )) || <RText></RText>;

const ScoreContainerComponent = ({ data, isOwner }) => (
  <View style={{ marginTop: '5%' }}>
    <ScoreContainer type="trip" data={data} isOwner={isOwner} />
  </View>
);

const loadStyles = (theme) => {
  const { isDark, currentTheme } = theme;
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
    descriptionText: {
      color: !isDark ? '#000' : '#fff',
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
