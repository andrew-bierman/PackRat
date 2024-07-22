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
import { truncateString } from '../../utils/truncateString';
import { useEditPack } from 'app/hooks/packs';
import { Platform } from 'react-native';
import { useEditTrips } from 'app/hooks/trips';
import { useAddFavorite } from 'app/hooks/favorites';

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
}

const UserDataCard = ({
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
}: UserDataCardProps) => {
  const { editPack: changePackStatus, isLoading: isPackLoading } =
    useEditPack();
  const { editTrips: changeTripStatus, isLoading: isTripLoading } =
    useEditTrips();
  const { addFavorite } = useAddFavorite();

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

    addFavorite(data);
  };

  const truncatedName = truncateString(name, 25);
  const truncatedDestination = truncateString(destination, 25);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
        marginVertical: 4,
        borderRadius: 8,
      }}
    >
      <View
        style={
          {
            minHeight: 150,
            minWidth: Platform.OS === 'web' ? 250 : 225,
            border: '1px solid gray',
            borderLeft: `10px solid ${is_public ? 'green' : 'red'}`,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: '#EBEBEB',
          } as any
        }
      >
        <RStack style={{ padding: 16, gap: 16 }}>
          <RStack style={{ gap: 8 }}>
            <RH2>
              <View
                style={
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: 10,
                    fontSize: 16,
                    fontWeight: 'bold',
                  } as any
                }
              >
                <RText style={{ fontSize: 16, color: 'black' }}>
                  {truncatedName}
                </RText>
                {(isPackLoading && type === 'pack') ||
                (isTripLoading && type === 'trip') ? (
                  <RSkeleton
                    style={{
                      height: 20,
                      width: 36,
                    }}
                  />
                ) : (
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
                )}
              </View>
            </RH2>
            {type === 'pack' ? (
              <RText
                style={{
                  fontSize: 12,
                  color: 'mediumpurple',
                  // marginLeft: '-0.5px',
                  // marginTop: '-3px',
                }}
              >
                Total Weight: {total_weight?.toFixed(2)}g
              </RText>
            ) : (
              <RText
                style={{
                  fontSize: 12,
                  color: 'mediumpurple',
                  // marginLeft: '-0.5px',
                  // marginTop: '-3px',
                }}
              >
                Destination: {truncatedDestination}
              </RText>
            )}
          </RStack>

          <RStack
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <RText
              style={{
                color: 'gray',
                fontSize: 12,
                fontWeight: '400',
              }}
            >
              {formatDistanceToNow(
                new Date(
                  !Number.isNaN(new Date(createdAt).getTime())
                    ? createdAt
                    : new Date(),
                ).getTime(),
                {
                  addSuffix: true,
                },
              ) ?? 0}
            </RText>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {differentUser ? (
                <TouchableOpacity onPress={handleAddToFavorite}>
                  <AntDesign
                    name="heart"
                    size={16}
                    color="red"
                    style={{ display: 'flex', position: 'absolute', right: 0 }}
                  />
                </TouchableOpacity>
              ) : (
                <RStack
                  color="gray"
                  gap="$2"
                  flexDirection="row"
                  fontWeight={400}
                >
                  <AntDesign name="heart" size={16} color="red" />
                  <View>
                    <RText>{favorites_count}</RText>
                  </View>
                </RStack>
              )}
            </View>
          </RStack>
        </RStack>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <RLink href={`/${type}/${id}`} style={{ textDecoration: 'none' }}>
            <RText color="gray" fontWeight="bold">
              View Details
            </RText>
          </RLink>
        </View>
      </View>
    </View>
  );
};

export default UserDataCard;
