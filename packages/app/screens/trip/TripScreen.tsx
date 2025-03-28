import React, { useState } from 'react';
import { RStack, RText, XStack, YStack } from '@packrat/ui';
import { FlatList, View } from 'react-native';
import { useRef } from 'react';
import { GearList } from '../../components/GearList/GearList';
import { TripForm } from 'app/components/trip/TripForm';
import useTheme from '../../hooks/useTheme';
import { useCreateTripForm } from 'app/hooks/trips/useCreateTripForm';
import { useTripsData } from './useTripsData';
import Layout from 'app/components/layout/Layout';
import RSecondaryButton from 'app/components/RSecondaryButton';

import { TripMapCard, TripSearchCard } from 'app/components/trip/TripCards';
import { WeatherData } from 'app/components/weather/WeatherData';
import { useFlatList } from 'app/hooks/useFlatList';
import useResponsive from 'app/hooks/useResponsive';
import { LayoutCard } from 'app/components/LayoutCard';
import { MapPin, MapPinned } from '@tamagui/lucide-icons';
import { type addTripKey } from './createTripStore/store';
import { useAuthUser } from 'app/modules/auth';
import { TripInfo } from './TripInfo';
import { MaterialIcons } from '@expo/vector-icons';
import { useDeleteTrips } from 'app/hooks/trips';

const SECTIONS = {
  MAP: 'MAP',
  PLACE_NAME: 'PLACE_NAME',
  PACK: 'PACK',
  WEATHER: 'WEATHER',
};

export function TripScreen({
  tripId,
  initialBounds,
  initialPlaceName,
  initialState,
  ownerId,
}: {
  tripId?: string;
  initialBounds?: any;
  initialPlaceName?: string;
  initialState?: Partial<Record<addTripKey, any>>;
  ownerId?: string;
}) {
  const placesAutoCompleteRef = useRef({});
  const [isChangePlaceMode, setIsChangePlaceMode] = useState(false);
  const [isBoundsChangeInProgress, setIsBoundsChangeInProgress] =
    useState(false);
  const { gtSm } = useResponsive();
  const authUser = useAuthUser();
  const hasPermissionToEdit = ownerId === authUser?.id;
  const isViewOnlyMode = !hasPermissionToEdit && !!tripId;

  const {
    currentDestination,
    photonDetails,
    isPhotonLoading,
    hasPhotonError,
    latLng,
  } = useTripsData() as {
    currentDestination: any;
    photonDetails: any;
    isPhotonLoading: boolean;
    hasPhotonError: boolean;
    latLng: any;
  };

  const { isValid, dateRange, setDateRange, tripStore, setTripValue } =
    useCreateTripForm(currentDestination, photonDetails);

  const { flatListData, keyExtractor, renderItem } = useFlatList(SECTIONS, {
    [SECTIONS.MAP]: (
      <TripMapCard
        isLoading={isPhotonLoading}
        isMapError={hasPhotonError}
        shape={photonDetails}
        tripId={tripId}
        initialBounds={initialBounds}
        onVisibleBoundsChange={(bounds) => {
          setTripValue('bounds', bounds);
          setIsBoundsChangeInProgress(false);
        }}
      />
    ),
    [SECTIONS.PLACE_NAME]: (
      <XStack style={{ gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <MapPinned size={20} />
        <RText style={{ fontSize: 20, fontWeight: 600 }}>
          {photonDetails?.features?.[0]?.properties?.['name:en'] ||
            photonDetails?.features?.[0]?.properties?.name ||
            initialPlaceName}
        </RText>
      </XStack>
    ),
    [SECTIONS.WEATHER]: !tripId ? (
      <LayoutCard>
        <WeatherData latLng={latLng || undefined} />
      </LayoutCard>
    ) : undefined,
    [SECTIONS.PACK]: <GearList isViewOnlyMode={isViewOnlyMode} />,
  });

  return (
    <Layout>
      {(isChangePlaceMode || (!latLng && !tripId)) && (
        <TripSearchCard
          searchRef={placesAutoCompleteRef}
          isChangePlaceMode={isChangePlaceMode}
          onGoBack={() => setIsChangePlaceMode(false)}
          onLocationSelect={() => {
            setIsChangePlaceMode(false);
            setIsBoundsChangeInProgress(true);
          }}
        />
      )}
      {latLng || tripId ? (
        <YStack
          style={{ gap: 16, display: isChangePlaceMode ? 'none' : 'flex' }}
        >
          <XStack
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <RText style={{ fontWeight: 700, fontSize: 24, marginTop: 32 }}>
              {isViewOnlyMode ? 'Trip Details' : 'Plan Your Trip'}
            </RText>
            {!isViewOnlyMode && (
              <XStack gap={8}>
                <RSecondaryButton
                  icon={<MapPin />}
                  size={36}
                  borderWidth={2}
                  onPress={() => setIsChangePlaceMode(true)}
                  label="Change Direction"
                />
                {tripId && <DeleteTripButton tripId={tripId} />}
              </XStack>
            )}
          </XStack>
          <RStack style={{ flexDirection: gtSm ? 'row' : 'column', gap: 16 }}>
            <View style={{ width: gtSm ? 450 : '100%' }}>
              <FlatList
                data={flatListData}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={() => (
                  <View style={{ width: '100%', height: 16 }} />
                )}
                renderItem={({ item }) =>
                  renderItem({ item }) as React.ReactElement
                }
              />
            </View>
            {!isViewOnlyMode ? (
              <LayoutCard
                title="Trip Details"
                style={{ flex: 1, alignSelf: 'flex-start', width: '100%' }}
              >
                <TripForm
                  tripId={tripId}
                  isDisabled={isBoundsChangeInProgress || !isValid}
                  dateRange={dateRange}
                  initialState={initialState}
                  setDateRange={setDateRange}
                  tripStore={tripStore}
                />
              </LayoutCard>
            ) : (
              <TripInfo tripInfo={initialState} />
            )}
          </RStack>
        </YStack>
      ) : null}
    </Layout>
  );
}

const DeleteTripButton = ({ tripId }: { tripId: string }) => {
  const { handleDeleteTrip } = useDeleteTrips(tripId);
  return (
    <RSecondaryButton
      icon={<MaterialIcons name="delete" size={20} />}
      size={36}
      borderWidth={2}
      danger
      onPress={handleDeleteTrip}
      label="Delete Trip"
    />
  );
};
