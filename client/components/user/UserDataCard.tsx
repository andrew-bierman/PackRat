import { AntDesign } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { View } from 'react-native';
import { RH2, RText, RStack, RSwitch } from '@packrat/ui';
import { changePackStatus } from '../../store/packsStore';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'expo-router';
import { truncateString } from '../../utils/truncateString';
import { useEffect } from 'react';

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
  state,
  setState,
  index,
  differentUser,
}) => {
  const dispatch = useDispatch();

  /**
   * Updates the state at the specified index with the given boolean value.
   *
   * @param {number} index - The index of the state to be updated.
   * @param {boolean} boolState - The boolean value to update the state with.
   * @return {void} This function does not return a value.
   */
  const updateState = (index, boolState) => {
    let states = state;
    states = states.map((state, iterator) => {
      return iterator === index ? boolState : state;
    });
    setState(states);
  };

  /**
   * Updates the status of an item at the specified index.
   *
   * @param {number} index - The index of the item to update.
   * @return {void} This function does not return a value.
   */
  const handleChangeStatus = (index) => {
    updateState(index, true);
    if (type === 'pack') {
      dispatch(changePackStatus({ _id, is_public: !is_public }));
    } else if (type === 'trip') {
    }
  };

  const truncatedName = truncateString(name, 25);
  const truncatedDestination = truncateString(destination, 25);

  return (
    <View style={{ alignItems: 'center', padding: '16px' }}>
      <View
        style={{
          minHeight: '150px',
          minWidth: '300px',
          border: '1px solid gray',
          borderLeft: `10px solid ${is_public ? 'green' : 'red'}`,
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#EBEBEB',
        }}
      >
        <RStack style={{ padding: '16px', gap: '16px' }}>
          <RStack style={{ gap: '8px' }}>
            <RH2>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: 10,
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                {truncatedName}
                {state[index] ? (
                  <RText style={{ fontSize: '16px' }}>Loading....</RText>
                ) : (
                  <>
                    {!differentUser && (
                      <RSwitch
                        isChecked={is_public}
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
                  fontSize: '12px',
                  color: 'mediumpurple',
                  marginLeft: '-0.5px',
                  marginTop: '-3px',
                }}
              >
                Total Weight: {total_weight}
              </RText>
            ) : (
              <RText
                style={{
                  fontSize: '12px',
                  color: 'mediumpurple',
                  marginLeft: '-0.5px',
                  marginTop: '-3px',
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
              gap: '16px',
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
                  fontSize: '12px',
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
