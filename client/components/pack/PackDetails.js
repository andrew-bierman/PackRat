import React, { useEffect, useState } from "react";

import { useSearchParams } from "expo-router";
import { fetchUserPacks } from "../../store/packsStore";
import { TableContainer } from "../pack_table/Table";

import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePack } from "../../store/singlePackStore";

import { CLIENT_URL } from "@env";
import { Box, Text } from "native-base";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { theme } from "../../theme";
import ScoreContainer from "../ScoreContainer";
import ChatContainer from "../chat";
import { DetailsComponent } from "../details";
import { AddItemModal } from "./AddItemModal";

export function PackDetails() {
  const searchParams = new URLSearchParams(window.location.search);

  let canCopy = searchParams.get("copy");

  const dispatch = useDispatch();

  const { packId } = useSearchParams();
  const link = `${CLIENT_URL}/packs/${packId}`;
  const isLoading = useSelector((state) => state.singlePack.isLoading);
  const [firstLoad, setFirstLoad] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const userId = user && user._id;
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const data = useSelector((state) => state);
  const currentPack = useSelector((state) => state.singlePack.singlePack);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    if (!packId) return;
    dispatch(fetchSinglePack(packId));
    if (userId) dispatch(fetchUserPacks(userId));
    setFirstLoad(false);
  }, [dispatch, packId]);

  const currentPackId = currentPack && currentPack._id;

  // check if user is owner of pack, and that pack and user exists
  const isOwner = currentPack && user && currentPack.owner_id === user._id;

  const error = useSelector((state) => state.singlePack.error);
  const isError = error !== null;

  if (isLoading && firstLoad) return <Text>Loading...</Text>;

  return (
    <Box
      style={[
        styles.mainContainer,
        Platform.OS == "web"
          ? { minHeight: "100vh" }
          : Dimensions.get("screen").height,
      ]}
    >
      {!isError && (
        <>
          <DetailsComponent
            type="pack"
            data={currentPack}
            isLoading={isLoading}
            error={error}
            additionalComps={
              <>
                <TableContainer currentPack={currentPack} copy={canCopy} />

                <Box style={styles.boxStyle}>
                  <AddItemModal
                    currentPackId={currentPackId}
                    currentPack={currentPack}
                    isAddItemModalOpen={isAddItemModalOpen}
                    setIsAddItemModalOpen={setIsAddItemModalOpen}
                  />
                </Box>
                <ScoreContainer
                  type="pack"
                  data={currentPack}
                  isOwner={isOwner}
                />
                <Box style={styles.boxStyle}>
                  <ChatContainer />
                </Box>
              </>
            }
            link={link}
          />
        </>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    flexDirection: "column",
    gap: 15,
    fontSize: 18,
    width: "100%",
  },
  packsContainer: {
    flexDirection: "column",
    minHeight: "100vh",

    padding: 25,
    fontSize: 26,
  },
  dropdown: {
    backgroundColor: "white",
  },
  boxStyle: {
    padding: 10,
    borderRadius: 10,
    width: "100%",
    minHeight: 100,
  },
});
