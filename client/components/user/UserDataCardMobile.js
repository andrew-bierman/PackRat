import { AntDesign } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Box, Heading, Text, HStack, Stack, Switch } from "native-base";
import useChangePublicStatus from "../../hooks/useChangePublicStatus";

export default function UserDataCardMobile({
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
        style={{
          borderRadius: 18,
          borderColor: "grey",
          overflow: "hidden",
          borderWidth: 1,
          backgroundColor: "white",
        }}
      >
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
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

            <Text>Total Weight: {total_weight}</Text>
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
                  flex: 1,
                }}
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
                <Text>{favorites_count}</Text>
              </Box>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}
