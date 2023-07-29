import { NativeBaseProvider, Container, Box, Text, Stack } from "native-base";
import { StyleSheet } from "react-native";
import PacksContainer from "./PacksContainer";
import { useAuth } from "../../auth/provider";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useGetUser from '../../hooks/useGetUser';

export default function UserProfileContainer({id}) {
  const { user } = useAuth();
console.log(id)
  const { data, isLoading, isError, error } = useGetUser(id);
  console.log({data,error})
  const { packs } = data;
  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box style={styles.mainContainer}>
      <Box w={["100%", "100%", "70%", "50%"]} style={styles.infoSection}>
        <Box style={styles.cardInfo}>
          <Text>{user?.name}</Text>
          <Text>{user?.email}</Text>
        </Box>
        <Stack direction={["column", "row", "row", "row"]} style={styles.card}>
          <Box style={styles.cardInfo}>
            <Text>Trips</Text>
            <Text>0</Text>
          </Box>
          <Box style={styles.cardInfo}>
            <Text>Packs</Text>
            <Text>{data?.length}</Text>
          </Box>
          <Box style={styles.cardInfo}>
            <Text>Certified</Text>
            <MaterialCommunityIcons
              name="certificate-outline"
              size={24}
              color={user?.is_certified_guide ? "green" : "grey"}
            />
          </Box>
        </Stack>
        <Box
          style={{
            width: "100%",
            alignItems: "center",
            padding: 8,
            backgroundColor: "#dbeafe",
            borderBottomEndRadius: 12,
            borderBottomStartRadius: 12,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 600 }}>Packs</Text>
        </Box>
        {isError ? <Text>{error}</Text> : null}
      </Box>
      {isLoading ? <Text>Loading....</Text> : <PacksContainer data={packs} />}
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    gap: 35,
    minHeight: "100vh",
    width: "100%",
    alignItems: "center",
    padding: 25,
    fontSize: 26,
  },
  infoSection: {
    flexDirection: "column",
    gap: 25,
    backgroundColor: "white",
    alignItems: "center",

    borderRadius: 12,
  },
  card: {
    gap: 25,
    backgroundColor: "white",
    alignItems: "center",
  },

  cardInfo: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    padding: 12,
  },
});
