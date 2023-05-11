import React, { useEffect } from "react";

import PackContainer from "./PackContainer";
import { DetailsHeader } from "../details/header";

import { useSearchParams } from "expo-router";
import { TableContainer } from "../pack_table/Table";
import { selectPackById } from "../../store/packsStore";

import { useSelector, useDispatch } from "react-redux";
import { fetchSinglePack } from "../../store/singlePackStore";

import { Box, Text } from "native-base";
import { DetailsComponent } from "../details";
import { StyleSheet } from "react-native";
import { theme } from "../../theme";
import { CLIENT_URL } from "@env"

export function PackDetails() {
    const dispatch = useDispatch();

    const { packId } = useSearchParams();

    const link = `${CLIENT_URL}/packs/${packId}`;

    useEffect(() => {
        dispatch(fetchSinglePack(packId));
    }, [dispatch, packId]);

    const currentPack = useSelector((state) => state.singlePack.singlePack)
    const isLoading = useSelector((state) => state.singlePack.isLoading)
    const error = useSelector((state) => state.singlePack.error)
    const isError = error !== null;

    if (isLoading) return <Text>Loading...</Text>

    return (
        <Box style={styles.mainContainer}>
            {!isError && (
                <>
                    <DetailsComponent
                        type="pack"
                        data={currentPack}
                        isLoading={isLoading}
                        error={error}
                        additionalComps={
                            <TableContainer currentPack={currentPack} />
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
      minHeight: "100vh",
      gap: 15,
      padding: 15,
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
