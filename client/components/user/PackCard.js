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
} from "native-base";
import useChangePublicStatus from "../../hooks/useChangePublicStatus";

export default function PackCard({
  _id,
  name,
  total_weight,
  is_public,
  favorited_by,
  favorites_count,
  createdAt,
}) {
  const { changeStatus } = useChangePublicStatus();

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
                {changeStatus.isLoading ? (
                  <Text>Loading....</Text>
                ) : (
                  <Switch
                    isChecked={is_public}
                    onToggle={() =>
                      changeStatus.mutate({ _id, is_public: !is_public })
                    }
                    size="sm"
                  />
                )}
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
      </Box>
    </Box>
  );
}
