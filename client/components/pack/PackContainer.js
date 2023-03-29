import { StyleSheet } from "react-native";
import { Box, Text } from "native-base";
import { useState } from "react";

import DropdownComponent from "../Dropdown";
import useGetPacks from "../../hooks/useGetPacks";
import { AddItem } from "../AddItem";
import { TableContainer } from "../Table";
import { useAuth } from "../../auth/provider";

export default function PackContainer() {
  const [currentPack, setCurrentPack] = useState();
  const [packName, setPackName] = useState("");
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useGetPacks(user?._id);

  const handlePack = (name) => {
    setCurrentPack(data?.find((pack) => pack.name === name));
    setPackName(name);
  };

  const dataValues = data?.map((pack) => pack.name) ?? [];

  if (isLoading) return <Text>Loading....</Text>;

  return dataValues?.length > 0 ? (
    <Box style={styles.mainContainer}>
      <DropdownComponent
        data={dataValues}
        value={packName}
        setUnit={handlePack}
        width="300"
      />
      {currentPack?._id ? <AddItem packId={currentPack._id} /> : null}
      {currentPack?._id ? <TableContainer packId={currentPack._id} /> : null}
      {isError ? <Text>{error}</Text> : null}
    </Box>
  ) : null;
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 35,
    width: "100%",
  },
});
