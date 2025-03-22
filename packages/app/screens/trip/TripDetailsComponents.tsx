import React, { useState } from 'react';
import { View } from 'react-native';
import ScoreContainer from '../../components/ScoreContainer';
import WeatherCard from '../../components/weather/WeatherCard';
import { TripMapCard } from 'app/components/trip/TripCards';
import { useFetchSinglePack, TableContainer } from 'app/modules/pack';
import { RSkeleton, RText } from '@packrat/ui';
import { AddItemModal } from 'app/modules/item';

const TableContainerComponent = ({
  currentPack,
  hideSummary = false,
  forceCardLayout = false,
}) => {
  const { data, isLoading } = useFetchSinglePack(currentPack.id || currentPack);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  if (isLoading) return <RSkeleton style={{}} />;

  if (data === null) return <RText>Pack Not Found</RText>;
  console.log({ currentPack }, 'currentPack');

  return (
    <View>
      <AddItemModal
        currentPackId={currentPack.id || ''}
        currentPack={currentPack}
        isAddItemModalOpen={isAddItemModalOpen}
        setIsAddItemModalOpen={setIsAddItemModalOpen}
        setRefetch={() => setRefetch((prev) => !prev)}
        showTrigger={true}
        initialData={{}}
      />
      <TableContainer
        currentPack={data}
        hideSummary={hideSummary}
        forceCardLayout={forceCardLayout}
      />
    </View>
  );
};

const WeatherCardComponent = ({
  weatherObject,
  weatherWeek,
  data,
}: {
  weatherObject: any;
  weatherWeek: any;
  data: { weather?: string };
}) => (
  <View style={{ marginTop: '5%', marginBottom: '1%' }}>
    <WeatherCard
      weatherToday={data?.weather ? JSON?.parse(data?.weather) : weatherObject}
      weatherWeek={weatherWeek}
    />
  </View>
);

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
  ScoreContainerComponent,
  loadStyles,
};
