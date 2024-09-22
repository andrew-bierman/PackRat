import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { View, TouchableOpacity } from 'react-native';
import {
  RH2,
  RText as OriginalRText,
  RStack,
  RSwitch,
  RLink,
  RSkeleton,
} from '@packrat/ui';
import { truncateString } from 'app/utils/truncateString';
import { useEditPack } from 'app/modules/pack';
import { Platform } from 'react-native';
import { useEditTrips } from 'app/hooks/trips';
import { useAddFavorite } from 'app/modules/feed';
import useTheme from 'app/hooks/useTheme';
import { PackSecondaryCard } from 'app/modules/pack/components/PackCard/PackSecondaryCard';
import { TripSecondaryCard } from 'app/modules/trip/components/TripCard/TripSecondaryCard';

const RText: any = OriginalRText;

interface UserDataCardProps {
  type: 'pack' | 'trip';
  destination: string;
  id: string;
  name: string;
  total_weight?: number;
  is_public: boolean;
  currentUserId?: number;
  favorites_count: number;
  createdAt: string;
  index: number;
  differentUser: boolean;
  activeUserId?: string;
  isFavorite: boolean;
}

export const UserDataCard = ({
  type, // "pack" or "trip"
  destination,
  id,
  name,
  total_weight,
  is_public,
  currentUserId,
  favorites_count,
  createdAt,
  index,
  differentUser,
  activeUserId,
  isFavorite,
}: UserDataCardProps) => {
  const { editPack: changePackStatus, isLoading: isPackLoading } =
    useEditPack();
  const { editTrips: changeTripStatus, isLoading: isTripLoading } =
    useEditTrips();
  const { addFavorite } = useAddFavorite();
  const { currentTheme } = useTheme();

  const handleChangeStatus = (index) => {
    if (type === 'pack') {
      return changePackStatus(
        { id, is_public: !is_public, name },
        {
          onSuccess: (utils) => {
            utils.getUserFavorites.invalidate();
          },
        },
      );
    }

    if (type === 'trip') {
      changeTripStatus(
        { id, is_public: !is_public },
        {
          onSuccess: (utils) => {
            utils.getUserFavorites.invalidate();
          },
        },
      );
    }
  };

  const handleAddToFavorite = () => {
    const data = {
      packId: id,
      userId: currentUserId,
    };

    addFavorite(data, String(activeUserId));
  };

  const truncatedName = truncateString(name, 25);
  const truncatedDestination = truncateString(destination, 25);

  return (
    <RStack>
      {type === 'pack' ? (
        <RStack
          style={{
            backgroundColor: currentTheme.colors.secondaryBlue,
            borderRadius: 20,
          }}
        >
          <PackSecondaryCard
            id={id}
            title={truncatedName}
            createdAt={createdAt}
            details={{
              score: favorites_count,
              weight: total_weight,
            }}
            cardType="secondary"
          />
          <RStack
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            <TouchableOpacity
              onPress={handleAddToFavorite}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AntDesign
                name="heart"
                size={16}
                color={isFavorite ? 'red' : currentTheme.colors.cardIconColor}
              />
            </TouchableOpacity>
            <>
              {!differentUser && (
                <RSwitch
                  checked={is_public}
                  onCheckedChange={() => {
                    handleChangeStatus(index);
                  }}
                  size="$1.5"
                />
              )}
            </>
          </RStack>
        </RStack>
      ) : (
        <TripSecondaryCard
          id={id}
          title={truncatedName}
          createdAt={createdAt}
          details={{
            destination: truncatedDestination,
          }}
          cardType="secondary"
        />
      )}
    </RStack>
  );
};
