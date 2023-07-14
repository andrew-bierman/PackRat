import { StyleSheet } from "react-native";
import { Box, Input, Button, Text } from "native-base";
import { Platform } from "react-native";

// import useAddPack from "../../hooks/useAddPack";
import { addPack, selectIsLoading,  selectError} from "../../store/packsStore";
import { theme } from "../../theme";
import { useState } from "react";
// import { useAuth } from "../../auth/provider";
import { useSelector, useDispatch } from "react-redux";
import { CustomModal } from "../modal";

export const AddPack = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  // const { addPack } = useAddPack();
  // const { user } = useAuth();
  const user = useSelector((state) => state.auth.user);

  const isLoading = useSelector((state) => state.packs.isLoading);

  const error = useSelector((state) => state.packs.error);

  const isError = error !== null;

  const handleAddPack = () => {
    dispatch(addPack({ name, owner_id: user?._id }));
    setName("");
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.mobileStyle}>
        <Input
          size="lg"
          variant="outline"
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          width={Platform.OS === "web" ? "25%" : "100%"}
        />

        <Button
          width={Platform.OS === "web" ? null : "50%"}
          onPress={() => {
            // addPack.mutate({ name, owner_id: user?._id });
            // setName("");
            handleAddPack();
          }}
        >
          <Text style={{ color: theme.colors.text }}>
            {isLoading ? "Loading..." : "Add Pack"}
          </Text>
        </Button>

        {isError && <Text>Pack already exists</Text>}
      </Box>
    </Box>
  );
};

export const AddPackContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CustomModal
      title="Add Pack"
      trigger="Add Pack"
      isActive={isOpen}
      onTrigger={setIsOpen}
    >
      <AddPack />
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 18,
    gap: 20,
  },
  desktopStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
    gap: 5,
    flex: 1,
  },

  mobileStyle: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    gap: 25,
  },

  input: {
    backgroundColor: "#ffffff",
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: "grey",
    borderWidth: 1,
    flex: 1,
    width: "100%",
    paddingVertical: 12,
  },
  btn: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 25,
    paddingVertical: 15,
    textAlign: "center",
    alignItems: "center",
    color: theme.colors.text,
    width: "50%",
  },
});
