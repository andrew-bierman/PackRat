import { AntDesign } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';

import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  Switch,
  Button,
} from 'native-base';

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
    <Box alignItems="center" padding="5">
      <Box
        minH="125"
        minW="80"
        borderLeftColor={is_public ? 'green.500' : 'red.500'}
        borderLeftWidth="10"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}
      >
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              <Box
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: 10,
                }}
              >
                {truncatedName}
                {state[index] ? (
                  <Text>Loading....</Text>
                ) : (
                  <>
                    {!differentUser && (
                      <Switch
                        isChecked={is_public}
                        onToggle={() => {
                          handleChangeStatus(index);
                        }}
                        size="sm"
                      />
                    )}
                  </>
                )}
              </Box>
            </Heading>
            {type === 'pack' ? (
              <Text
                fontSize="xs"
                _light={{
                  color: 'violet.500',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                Total Weight: {total_weight}
              </Text>
            ) : (
              <Text
                fontSize="xs"
                _light={{
                  color: 'violet.500',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                Destination: {truncatedDestination}
              </Text>
            )}
          </Stack>

          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center" width="100%">
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400"
                flex={1}
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
              </Text>
              <Box
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <AntDesign name="heart" size={16} color="red" />
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight="400"
                >
                  {favorites_count}
                </Text>
              </Box>
            </HStack>
          </HStack>
        </Stack>
        <Box alignItems="center">
          <Link href={`/${type}/${_id}`}>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="bold"
            >
              View Details
            </Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDataCard;
