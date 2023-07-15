import { Text, View } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { Box, Button } from "native-base";
import { StyleSheet, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../theme";
import { Tooltip } from "native-base";
import { CustomModal } from "../../components/modal";
import { AddItemGlobal } from "../../components/item/AddItemGlobal";
import { ItemsTable } from "../../components/itemtable/itemTable";
import { useDispatch, useSelector } from "react-redux";
import { getItemsGlobal } from "../../store/globalItemsStore";

export default function Items() {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.globalItems);
  // console.log("data", );
  const isLoading = useSelector((state) => state.globalItems.isLoading);
  const isError = useSelector((state) => state.globalItems.isError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemsGlobal({ limit, page }));
  }, [limit, page]);

  return (
    <Box>
      <>
        <CustomModal
          title="Add a global Item"
          trigger="Add Item"
          isActive={isAddItemModalOpen}
          triggerComponent={
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "2rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <Button
                style={styles.button}
                onPress={() => {
                  setIsAddItemModalOpen(true);
                }}
              >
                Add Item
              </Button>
              {Platform.OS === "web" ? (
                <Tooltip
                  label="Add a global item"
                  placement="top left"
                  openDelay={500}
                >
                  <Button
                    width={8}
                    height={8}
                    style={{ backgroundColor: "none" }}
                  >
                    <MaterialIcons
                      name="info-outline"
                      size={20}
                      color={theme.colors.background}
                    />
                  </Button>
                </Tooltip>
              ) : null}
            </View>
          }
          onCancel={setIsAddItemModalOpen}
        >
          <AddItemGlobal
            setPage={setPage}
            setIsAddItemModalOpen={setIsAddItemModalOpen}
          />
        </CustomModal>
      </>
      {!isError && Array.isArray(data.globalItems.items) ? (
        <ItemsTable
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          data={data}
          isLoading={isLoading}
          isError={isError}
          totalPages={data?.globalItems?.totalPages}
        />
      ) : null}
    </Box>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0284c7",
    width: Platform.OS === "web" ? "20rem" : "20%",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#ffffff",
  },
});
