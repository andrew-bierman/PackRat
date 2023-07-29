import React, { useEffect } from "react";

import PackContainer from "./PackContainer";
import { DetailsHeader } from "../details/header";

import { useSearchParams } from "expo-router";
import { TableContainer } from "../pack_table/Table";
import { fetchUserPacks, selectPackById } from "../../store/packsStore";

import { useSelector, useDispatch } from "react-redux";
import { fetchSinglePack } from "../../store/singlePackStore";

import { Box, Text } from "native-base";
import { DetailsComponent } from "../details";
import { Platform, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { CLIENT_URL } from "@env";
import ScoreContainer from "../ScoreContainer";
import ChatContainer from "../chat";

export function PackDetails() {
  const searchParams = new URLSearchParams(window.location.search);
  let canCopy = searchParams.get("copy");

  const dispatch = useDispatch();

  const { packId } = useSearchParams();

  const link = `${CLIENT_URL}/packs/${packId}`;

  const user = useSelector((state) => state.auth.user);
  const userId = user && user._id;
  useEffect(() => {
    if (!packId) return;
    dispatch(fetchSinglePack(packId));
    if(userId) dispatch(fetchUserPacks(userId));
  }, [dispatch, packId]);

  const currentPack = useSelector((state) => state.singlePack.singlePack);


  // check if user is owner of pack, and that pack and user exists
  const isOwner = currentPack && user && currentPack.owner_id === user._id;

  const isLoading = useSelector((state) => state.singlePack.isLoading);
  const error = useSelector((state) => state.singlePack.error);
  const isError = error !== null;

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box
      style={[
        styles.mainContainer,
        Platform.OS == "web" ? { minHeight: "100vh" } : null,
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
                <ScoreContainer
                  type="pack"
                  data={currentPack}
                  isOwner={isOwner}
                />
                <Box
                  style={{
                    width: "100%",
                  }}
                >
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
});
