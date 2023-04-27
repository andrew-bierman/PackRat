import { AntDesign } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../theme";
import useAddToFavorite from "../../hooks/useAddToFavorites";
// import { useAuth } from "../../auth/provider";

import {
  Box,
  Heading,
  AspectRatio,
  Text,
  Center,
  HStack,
  Stack,
} from "native-base";

// import { useAuth } from "../../auth/provider";

export default function Card({
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

  const { addToFavorite } = useAddToFavorite();
  return (
    <Box alignItems="center" padding="4">
      <Box
        minH="125"
        minW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
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
                  gap: 10,
                }}
              >
                {name}
                <MaterialIcons name="backpack" size={24} color="gray.700" />
              </Box>
            </Heading>

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
                  {user?._id === owner_id ? null : addToFavorite.isLoading ? (
                    <Text>Loading...</Text>
                  ) : (
                    <AntDesign
                      onPress={() =>
                        addToFavorite.mutate({
                          packId: _id,
                          userId: user?._id,
                        })
                      }
                      name="heart"
                      size={16}
                      color={user?.favorites.includes(_id) ? "red" : "grey"}
                    />
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
