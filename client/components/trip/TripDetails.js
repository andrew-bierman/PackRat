import React, { useEffect } from "react";


import { DetailsHeader } from "../details/header";

import { Link, useSearchParams } from "expo-router";
import { TableContainer } from "../pack_table/Table";
import { selectPackById } from "../../store/packsStore";

import { useSelector, useDispatch } from "react-redux";
import { fetchSingleTrip } from "../../store/singleTripStore";

import { Box, Text } from "native-base";
import { DetailsComponent } from "../details";
import { StyleSheet } from "react-native";
import { theme } from "../../theme";
import { CLIENT_URL } from "@env";
import ScoreContainer from "../ScoreContainer";

export function TripDetails() {
  const dispatch = useDispatch();

  const { tripId } = useSearchParams();

  const link = `${CLIENT_URL}/trip/${tripId}`;

  useEffect(() => {
    if(!tripId) return;
    dispatch(fetchSingleTrip(tripId));
  }, [dispatch, tripId]);
  const states = useSelector((state) => state)

  console.log('aksjdhjkashdkjs', states)
  const currentTrip = useSelector((state) => state.singleTrip.singleTrip);

  const user = useSelector((state) => state.auth.user);

  // check if user is owner of pack, and that pack and user exists
  const isOwner = currentTrip && user && currentTrip.owner_id === user._id;

 

  const isLoading = useSelector((state) => state.singleTrip.isLoading);
  const error = useSelector((state) => state.singleTrip.error);
  const isError = error !== null;

  if (isLoading) return <Text>Loading...</Text>;

  console.log('isOwner in packdetails', currentTrip)

  return (
    <Box style={styles.mainContainer}>
      {!isError && (
        <>
          <DetailsComponent
            type="trip"
            data={currentTrip}
            isLoading={isLoading}
            error={error}
            additionalComps={
              <>
                <TableContainer currentPack={currentTrip?.packs} />
                <ScoreContainer type='trip' data={currentTrip} isOwner={isOwner}/>
               
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
    minHeight: "100vh",
    gap: 15,
    padding: [25, 25, 0, 25], // [top, right, bottom, left
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
