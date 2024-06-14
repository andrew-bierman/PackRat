import { AntDesign } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { View } from 'react-native';
import {
  RH2,
  RText as OriginalRText,
  RStack,
  RSwitch,
  RLink,
} from '@packrat/ui';
import { truncateString } from '../../utils/truncateString';
import { useEditPack } from 'app/hooks/packs';
import { Platform } from 'react-native';

const RText: any = OriginalRText;

interface UserDataCardProps {
  type: 'pack' | 'trip';
  destination: string;
  id: string;
  name: string;
  total_weight?: number;
  is_public: boolean;
  favorited_by?: string[];
  favorites_count: number;
  createdAt: string;
  state: boolean[];
  setState: React.Dispatch<React.SetStateAction<boolean[]>>;
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
  favorited_by,
  favorites_count,
  createdAt,
  state,
  setState,
  index,
  differentUser,
}: UserDataCardProps) => {
  const { editPack: changePackStatus } = useEditPack();

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
      changePackStatus({ id, is_public: !is_public, name });
    } else if (type === 'trip') {
    }
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
                {state[index] ? (
                  <RText style={{ fontSize: 16 }}>Loading....</RText>
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
                Total Weight: {total_weight}g
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
              <RText color="gray" fontWeight={400}>
                {favorites_count}
              </RText>
              <AntDesign
                name="heart"
                size={16}
                color="red"
                style={{ display: 'flex', position: 'absolute', right: 0 }}
              />
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
