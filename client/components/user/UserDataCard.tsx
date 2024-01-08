import { AntDesign } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { View } from 'react-native';
import { RH2, RText, RStack, RSwitch } from '@packrat/ui';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'expo-router';
import { truncateString } from '../../utils/truncateString';
import { useEffect } from 'react';
import useUserDataCard from '~/hooks/data/useUserDataCard';

const UserDataCard = ({
  type, // "pack" or "trip"
  destination,
  _id,
  name,
  total_weight,
  is_public,
  favorited_by,
  favorites_count,
  createdAt,
  index,
  differentUser,
}) => {
  const { state, setState, handleChangeStatus } = useUserDataCard(
    type,
    _id,
    is_public,
    index,
    differentUser,
  );

  const truncatedName = truncateString(name, 25);
  const truncatedDestination = truncateString(destination, 25);

  return (
    <View style={{ alignItems: 'center', padding: 16 }}>
      <View
        style={{
          minHeight: 150,
          minWidth: 300,
          border: 1, 'solid gray',
          borderLeft: `10, solid ${is_public ? 'green' : 'red'}`,
          borderRadius: 8,
          overflow: 'hidden',
          backgroundColor: '#EBEBEB',
        }}
      >
        <RStack style={{ padding: 16, gap: 16 }}>
          <RStack style={{ gap: 8 }}>
            <RH2>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: 10,
                  // fontSize: 16,
                  // fontWeight: 'bold',
                }}
              >
                <RText style={{ fontSize: '16,' }}>{truncatedName}</RText>
                {state[index] ? (
                  <RText style={{ fontSize: '16,' }}>Loading....</RText>
                ) : (
                  <>
                    {!differentUser && (
                      <RSwitch
                        checked={is_public}
                        onToggle={() => {
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
                  fontSize: '12,',
                  color: 'mediumpurple',
                  marginLeft: '-0.5,',
                  marginTop: '-3,',
                }}
              >
                Total Weight: {total_weight}
              </RText>
            ) : (
              <RText
                style={{
                  fontSize: '12,',
                  color: 'mediumpurple',
                  marginLeft: '-0.5,',
                  marginTop: '-3,',
                }}
              >
                Destination: {truncatedDestination}
              </RText>
            )}
          </RStack>

          <RStack
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: '16,',
              justifyContent: 'space-between',
            }}
          >
            <RStack
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <RText
                style={{
                  color: 'gray',
                  fontSize: '12,',
                  fontWeight: '400',
                  flex: 1,
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
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <AntDesign name="heart" size={16} color="red" />
                <RText color="gray" fontWeight="400">
                  {favorites_count}
                </RText>
              </View>
            </RStack>
          </RStack>
        </RStack>
        <View style={{ alignItems: 'center' }}>
          <Link href={`/${type}/${_id}`}>
            <RText color="gray" fontWeight="bold">
              View Details
            </RText>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default UserDataCard;
