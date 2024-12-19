import React, { type FC } from 'react';
import { RText, XStack, YStack, RStack } from '@packrat/ui';
import { DestinationDetail } from './DestinationDetail';
import { MapPin, Globe, Building2, Hash } from '@tamagui/lucide-icons';
import useTheme from 'app/hooks/useTheme';
import { LayoutCard } from 'app/components/LayoutCard';

interface DestinationDetailsProps {
  destinationProperties: any;
}
export const DestinationDetails: FC<DestinationDetailsProps> = ({
  destinationProperties,
}) => {
  const { currentTheme } = useTheme();
  const details = getDestinationInfo(destinationProperties);

  return (
    <LayoutCard style={{ width: '100%' }}>
      <YStack style={{ gap: 16 }}>
        <XStack
          style={{ width: '100%', justifyContent: 'space-between', gap: 8 }}
        >
          <RText
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{ flex: 1, fontSize: 18, fontWeight: 600 }}
          >
            {destinationProperties?.int_name || destinationProperties?.name}
          </RText>
          <RText
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              backgroundColor: '#e6e6e6',
              fontWeight: 600,
              color: '#000000',
              borderRadius: 8,
              paddingLeft: 10,
              paddingRight: 10,
              width: 'auto',
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            {destinationProperties?.osm_value}
          </RText>
        </XStack>
        <RStack style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          <DestinationDetail
            label="Country"
            value={details.country}
            icon={<Globe size={20} />}
          />
          <DestinationDetail
            label="State"
            value={details.state}
            icon={<MapPin size={20} />}
          />
          <DestinationDetail
            label="Locality"
            value={details.locality}
            icon={<Building2 size={20} />}
          />
          <DestinationDetail
            label="OSM ID"
            value={details.osmId}
            icon={<Hash size={20} />}
          />
        </RStack>
      </YStack>
    </LayoutCard>
  );
};

const getDestinationInfo = (destinationProperties: any) => {
  if (!destinationProperties) {
    return null;
  }

  return {
    country:
      destinationProperties?.['is_in:country'] ||
      destinationProperties?.country,
    state: destinationProperties?.state,
    locality: getPlaceLocality(destinationProperties),
    osmId: destinationProperties?.osm_id,
  };
};

const getPlaceLocality = (destinationProperties: any) => {
  if (['city', 'village', 'town'].includes(destinationProperties.osm_value)) {
    return destinationProperties['name:en'];
  }

  return (
    destinationProperties?.city ||
    destinationProperties?.town ||
    destinationProperties?.village
  );
};
