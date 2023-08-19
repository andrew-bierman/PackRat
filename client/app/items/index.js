import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Button, ScrollView } from "native-base";
import { StyleSheet, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../theme";
import { Tooltip } from "native-base";
import { CustomModal } from "../../components/modal";
import { AddItemGlobal } from "../../components/item/AddItemGlobal";
import { ItemsTable } from "../../components/itemtable/itemTable";
import { useDispatch, useSelector } from "react-redux";
import { getItemsGlobal } from "../../store/globalItemsStore";
import { Stack as Header } from "expo-router";
// import NetInfo from '@react-native-community/netinfo';
import { InformUser } from "~/utils/ToastUtils";
import { isConnected } from "~/utils/netInfo";
export default function Items() {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  // pagination index limit
  const [limit, setLimit] = useState(5);
  // page number for pagination
  const [page, setPage] = useState(1);
  // it will be used as a dependency for reloading the data in case of some modifications
  const [refetch, setRefetch] = useState(false);
  
  const data = useSelector((state) => state.globalItems);
  const isLoading = useSelector((state) => state.globalItems.isLoading);
  const isError = useSelector((state) => state.globalItems.isError);
  const [offline, setOffline] = useState(false);

  
  const dispatch = useDispatch();
  useEffect(() => {
        isConnected().then(connected => {
          if(connected) {
            dispatch(getItemsGlobal({ limit, page }));
          } else {
            setOffline(true)
            InformUser({
              title : "You are not Connected to Internet",
              placement: "bottom",
              duration: 2000,
              style: {
                backgroundColor: "green",
              },
            })
          }
        })
  }, [limit, page, refetch]);

  return (
    <ScrollView>
      <Header.Screen
        options={{
          title: "Items",
        }}
      />
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
              setRefetch={setRefetch}
              refetch={refetch}
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
            isLoading={isLoading && !offline}
            totalPages={data?.globalItems?.totalPages}
            refetch={refetch}
            setRefetch={setRefetch}
          />
        ) : null}
      </Box>
    </ScrollView>
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
