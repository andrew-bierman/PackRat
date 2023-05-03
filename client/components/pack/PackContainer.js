import { StyleSheet } from "react-native";
import { Box, Text } from "native-base";
import { useEffect, useState } from "react";

import DropdownComponent from "../Dropdown";
import useGetPacks from "../../hooks/useGetPacks";
import { AddItem } from "../AddItem";
import { TableContainer } from "../Table";
// import { useAuth } from "../../auth/provider";
import { useSelector } from "react-redux";
import { fetchUserPacks } from "../../store/packsStore";
import { useDispatch } from "react-redux";

import { CustomModal } from "../modal";

export default function PackContainer() {
  const dispatch = useDispatch()

  const [currentPack, setCurrentPack] = useState();
  const [packName, setPackName] = useState("");
  // const { user } = useAuth();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUserPacks(user?._id))
  }, [dispatch, user?._id])

  // const { data, isLoading, isError, error } = useGetPacks(user?._id);

  const data = useSelector((state) => state.packs.packs);

  const isLoading = useSelector((state) => state.packs.isLoading);

  const error = useSelector((state) => state.packs.error);

  const isError = error !== null;


  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handlePack = (name) => {
    setCurrentPack(data?.find((pack) => pack.name === name));
    setPackName(name);
  };

  const dataValues = data?.map((pack) => pack.name) ?? [];

  // if (isLoading) return <Text>Loading....</Text>;

  return dataValues?.length > 0 ? (
    <Box style={styles.mainContainer}>
      <DropdownComponent
        data={dataValues}
        value={packName}
        setUnit={handlePack}
        width="300"
      />
      {currentPack?._id ? (
        <>
          <CustomModal
            title="Add Item"
            trigger="Add Item"
            isActive={isAddItemModalOpen}
            onTrigger={setIsAddItemModalOpen}
            footerButtons={[
              {
                label: "Save",
                color: "primary",
                onClick: () => setIsAddItemModalOpen(false),
              },
              {
                label: "Cancel",
                color: "danger",
                onClick: () => setIsAddItemModalOpen(false),
              },
            ]}
          >
            {/* Add your modal content here */}
            <AddItem key={`addItem comp - ${currentPack._id}`} packId={currentPack._id} />
          </CustomModal>
          <TableContainer key={`table - ${currentPack._id}`} currentPack={currentPack} />
        </>
      ) : null}

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
