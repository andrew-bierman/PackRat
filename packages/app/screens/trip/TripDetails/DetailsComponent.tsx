import React from 'react';
import { View } from 'react-native';
import TableContainer from '../pack_table/Table';
import WeatherCard from '../weather/WeatherCard';
import TripCard from '../TripCard';
import ScoreContainer from '../ScoreContainer';
import { FontAwesome5 } from '@expo/vector-icons';
import useDetails from './hooks/useDetails'; // custom hook

export default function DetailsComponent({ type, data, isLoading, link }) {
  const { weatherObject, weatherWeek, isOwner } = useDetails(data); 

  return (
    <>
      <View>
        <TableContainer currentPack={data?.packs} />
      </View>
      <View style={{ marginTop: '5%' }}>
        <WeatherCard
          weatherObject={
            data?.weather ? JSON?.parse(data?.weather) : weatherObject
          }
          weatherWeek={weatherWeek}
        />
      </View>
      {data?.geojson?.features.length && (
        <TripCard
          Icon={() => (
            <FontAwesome5
              name="route"
              size={24}
              color={currentTheme.colors.cardIconColor}
            )}
          title="Map"
          isMap={true}
          shape={data.geojson}
          cords={
            data?.weather
              ? JSON?.parse(data?.weather)?.coord
              : weatherObject?.coord
          }
        />
      )}
      <View style={{ marginTop: '5%' }}>
        <ScoreContainer type="trip" data={data} isOwner={isOwner} />
      </View>
    </>
  );
}