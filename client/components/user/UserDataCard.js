import { AntDesign } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";

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
} from "native-base";
// import useChangePublicStatus from "../../hooks/useChangePublicStatus";
import { changePackStatus } from "../../store/packsStore";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "expo-router";

export default function UserDataCard({
  type, // "pack" or "trip"
  destination,
  _id,
  name,
  total_weight,
  is_public,
  favorited_by,
  favorites_count,
  createdAt,
}) {
  // const { changeStatus } = useChangePublicStatus();

  const dispatch = useDispatch();

  const handleChangeStatus = () => {
    if (type === "pack") {
      dispatch(changePackStatus({ _id, is_public: !is_public }));
    } else if (type === "trip") {
      // Dispatch action for trips
      // ...
    }
  };

  const isLoading = useSelector((state) => state.packs.isLoading);

  return (
    <Box alignItems="center" padding="5">
      <Box
        minH="125"
        minW="80"
        borderLeftColor={is_public ? "green.500" : "red.500"}
        borderLeftWidth="10"
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
        <Stack p="4" space={3}>
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
                {isLoading ? (
                  <Text>Loading....</Text>
                ) : (
                  <Switch
                    isChecked={is_public}
                    onToggle={handleChangeStatus}
                    size="sm"
                  />
                )}
              </Box>
            </Heading>
            {type === "pack" ? (
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
            ) : (
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
                Destination: {destination}
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
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <AntDesign name="heart" size={16} color="red" />
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
            </HStack>
          </HStack>
        </Stack>
        <Box alignItems="center">
          <Link href={`/${type}/${_id}`}>
            <Button
              _text={{
                color: "white",
              }}
            >
              View Details
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
