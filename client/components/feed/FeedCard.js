import { AntDesign } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { theme } from "../../theme";
// import useAddToFavorite from "../../hooks/useAddToFavorites";
// import { useAuth } from "../../auth/provider";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavorite,
  selectFavoriteById,
  selectAllFavorites,
} from "../../store/favoritesStore";
import { Dimensions, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { DuplicateIcon } from "../DuplicateIcon/index";
import { truncateString } from "../../utils/truncateString";

import {
  Box,
  Heading,
  AspectRatio,
  Text,
  Center,
  HStack,
  Stack,
  Button,
} from "native-base";

// import { useAuth } from "../../auth/provider";

const { height, width } = Dimensions.get('window')

export default function Card({
  type,
  _id,
  owner,
  name,
  total_weight,
  is_public,
  favorited_by,
  favorites_count,
  owner_id,
  destination,
  createdAt,
  owners,
}) {
  const user = useSelector((state) => state.auth.user);

  const favorites = useSelector(selectAllFavorites);
  const dispatch = useDispatch();

  const isFavorite = favorites.some((favorite) => favorite.pack_id === _id);

  console.log('total weight', name)

  const handleAddToFavorite = () => {
    const data = {
      packId: _id,
      userId: user._id,
    };

    dispatch(addFavorite(data));
  };

  const handleRemoveFromFavorite = () => {
    const favorite = favorites.find(
      (favorite) => favorite.pack_id === _id && favorite.user_id === user._id
    );
    if (favorite) {
      dispatch(removeFavorite(favorite.id));
    }
  };
  // const { addToFavorite } = useAddToFavorite();

  const truncatedName = truncateString(name, 25);
  const truncatedDestination = truncateString(destination, 25);

  return (
    <View style={styles.packCard} >
      <Stack p="4" space={10}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Link href={type === "pack" ? "/pack/" + _id : "/trip/" + _id}>
                {truncatedName}
              </Link>
              {type === "pack" && (
                <Box
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <MaterialIcons name="backpack" size={24} color="gray" />
                  <Link href={"/pack/" + _id + "?copy=true"}>
                    <DuplicateIcon />
                  </Link>
                </Box>
              )}
              {type === "trip" && (
                <Entypo name="location-pin" size={24} color="gray" />
              )}
            </Box>
          </Heading>

          {type === "pack" && (
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              Total Weight: {total_weight}
            </Text>
          )}

          {type === "trip" && (
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {truncatedDestination}
            </Text>
          )}
        </Stack>

        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <Link href={`/profile/${owner_id}`}>
                <Text>
                  View {owner?.username ? "@" + owner?.username : "Owner"}
                </Text>
              </Link>
              <Box
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                  flex={1}
                >
                  {formatDistanceToNow(
                    new Date(
                      !Number.isNaN(new Date(createdAt).getTime())
                        ? createdAt
                        : new Date()
                    ).getTime(),
                    {
                      addSuffix: true,
                    }
                  ) ?? 0}
                </Text>
              </Box>
            </Box>

            <Box
              style={{
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text>Favorites</Text>
              <Box
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {user?._id === owner_id ? null : (
                  <TouchableOpacity onPress={handleAddToFavorite}>
                    <AntDesign
                      name="heart"
                      size={16}
                      color={isFavorite ? "red" : "grey"}
                    />
                  </TouchableOpacity>
                )}

                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                >
                  {favorites_count}
                </Text>
              </Box>
            </Box>
          </HStack>
        </HStack>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  packCard: {
    height: 220,
    width: Platform.OS === 'web' ? 320 : width * 0.68,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

})