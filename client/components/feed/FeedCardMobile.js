import { AntDesign } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";

import useAddToFavorite from "../../hooks/useAddToFavorites";

import { Box, Heading, Text, HStack, Stack } from "native-base";

// import { useAuth } from "../../auth/provider";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, selectAllFavourites } from "../../store/favoritesStore";

export default function FeedCardMobile({
  _id,
  name,
  total_weight,
  is_public,
  favorited_by,
  favorites_count,
  owner_id,
  createdAt,
}) {
  // const { user } = useAuth();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // const favorites = useSelector((state) => state.favorites);
  const favorites = useSelector(selectAllFavourites);
  console.log(favorites);

  // const { addToFavorite } = useAddToFavorite();

  const handleAddToFavorite = () => {
    dispatch(addFavorite({ pack_id: _id, user_id: user._id }));
  };
  return (
    <Box alignItems="center" padding="4">
      <Box
        style={{
          borderRadius: 18,
          borderColor: "grey",
          overflow: "hidden",
          borderWidth: 1,
          backgroundColor: "white",
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
                  gap: 10,
                }}
              >
                {name}
                <MaterialIcons name="backpack" size={24} color="grey" />
              </Box>
            </Heading>

            <Text
              style={{
                fontSize: 18,
                color: "violet",
                fontWeight: 500,
                marginLeft: 1,
                marginTop: 2,
              }}
            >
              Total Weight: {total_weight}
            </Text>
          </Stack>

          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center" width="100%">
              <Text
                style={{
                  fontSize: 18,
                  color: "violet",
                  fontWeight: 500,
                  marginLeft: 1,
                  marginTop: 2,
                }}
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
                  {user?._id === owner_id ? null : favorites.isLoading ? (
                    <Text>Loading...</Text>
                  ) : (
                    <AntDesign
                      onPress={() => handleAddToFavorite()}
                      name="heart"
                      size={16}
                      color={user?.favorites.includes(_id) ? "red" : "grey"}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 18,
                      color: "violet",
                      fontWeight: 500,
                      marginLeft: 1,
                      marginTop: 2,
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
