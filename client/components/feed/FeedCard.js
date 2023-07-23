import { AntDesign } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { theme } from "../../theme";
// import useAddToFavorite from "../../hooks/useAddToFavorites";
// import { useAuth } from "../../auth/provider";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, selectFavoriteById, selectAllFavorites } from "../../store/favoritesStore";
import { duplicatePackItem } from "../../store/packsStore";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
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

export default function Card({
  type,
  _id,
  name,
  total_weight,
  is_public,
  favorited_by,
  favorites_count,
  owner_id,
  destination,
  createdAt,
}) {

  const user = useSelector((state) => state.auth.user);

  const favorites = useSelector(selectAllFavorites);
  const dispatch = useDispatch();

  const isFavorite = favorites.some((favorite) => favorite.pack_id === _id);

  const handleAddToFavorite = () => {
    const data = {
      packId: _id,
      userId: user._id,
    };

    dispatch(addFavorite(data));
  };
  const handleDuplicate = () => {
    const data = {
      packId: _id,
      ownerId: user._id,
    };
    dispatch(duplicatePackItem(data));
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
    <Box alignItems="center" padding="4">
      <Box
        minH="125"
        minW="80"
        maxW="lg" // add this
        mx="auto" // add this
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
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
                    <Button
                      onPress={handleDuplicate}
                      style={{
                        backgroundColor: "transparent",
                        width: "10",
                        height: "10",
                        padding: 0,
                        paddingLeft: 15,
                      }}
                    >
                      <MaterialIcons name="file-copy" size={24} color="gray" />
                    </Button>
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
            <HStack alignItems="center" width="100%">
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
      </Box>
    </Box>
  );
}
