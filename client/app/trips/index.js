import Footer from "../../components/footer/Footer";
import { Stack, Box, Text, ScrollView, Button, Input, HStack } from "native-base";
import { Stack as Header } from "expo-router";

import { theme } from "../../theme";
import Card from "../../components/Card";
import WeatherCard from "../../components/WeatherCard";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Platform, StyleSheet } from "react-native";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { GearList } from "../../components/GearList";

import { MapContainer } from "../../components/map/MapContainer";

import { CustomModal } from "../../components/modal";

export default function Trips() {

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const [parksData, setParksData] = useState();
    const [trails, setTrailsData] = useState();
    const weatherObject = useSelector((state) => state.weather.weatherObject);
    const trailsObject = useSelector((state) => state.trails.trailsDetails);
    const parksObject = useSelector((state) => state.parks.parksDetails);


    useEffect(() => {

        setTrailsData(trailsObject)

    }, [trailsObject]);

    useEffect(() => {

        setParksData(parksObject)

    }, [parksObject]);

    return (
        <ScrollView>
            {Platform.OS === "web" ? (
                <Header.Screen
                    options={{
                        // https://reactnavigation.org/docs/headers#setting-the-header-title
                        title: "Home",
                    }}
                />
            ) : null}
            <Box style={styles.mutualStyles}>
                <Stack m={[0, 0, 12, 16]} style={{ gap: 25 }}>
                    <Card
                        title="Where are you heading?"
                        isSearch={true}
                        Icon={() => (
                            <FontAwesome
                                name="map"
                                size={20}
                                color={theme.colors.cardIconColor}
                            />
                        )}
                    />

                    <WeatherCard weatherObject={weatherObject} />

                    <Card
                        title="Nearby Trails"
                        value="Trail List"
                        isTrail={true}
                        data={trails || []}
                        Icon={() => (
                            <FontAwesome5
                                name="hiking"
                                size={20}
                                color={theme.colors.cardIconColor}
                            />
                        )}
                    />

                    <Card
                        title="Nearby Parks"
                        value="Parks List"
                        data={parksData}
                        Icon={() => (
                            <FontAwesome5
                                name="mountain"
                                size={20}
                                color={theme.colors.cardIconColor}
                            />
                        )}
                    />
                    <GearList />

                    <Card
                        Icon={() => (
                            <FontAwesome5
                                name="route"
                                size={24}
                                color={theme.colors.cardIconColor}
                            />
                        )}
                        title="Map"
                        isMap={true}
                    />
                </Stack>

                <CustomModal
                    title="Save Trip"
                    trigger="Save Trip"
                    isActive={isSaveModalOpen}
                    onTrigger={() => setIsSaveModalOpen(!isSaveModalOpen)}
                    footerButtons={
                        [
                            {
                                label: "Save",
                                onPress: () => console.log("Save"),
                            },
                        ]
                    }
                >
                    <>
                        <Input placeholder="Trip Name" />
                        <Input placeholder="Trip Description" />
                        <>
                            <Text>
                                Duration
                            </Text>
                            <HStack>
                                <Input placeholder="Trip Start Date" />
                                <Input placeholder="Trip End Date" />
                            </HStack>
                        </>
                        <>
                            <Text>
                                Trip Weather
                            </Text>
                            <Text>
                                `Abbreviated Weather Info`
                            </Text>
                        </>
                        <HStack>
                            <Text>
                                Pack
                            </Text>
                            <Text>
                                `Selected Pack Name`
                            </Text>
                        </HStack>
                        <HStack>
                            <Text>
                                Trip Location
                            </Text>
                            <Text>
                                `Selected Location`
                            </Text>
                        </HStack>
                        <HStack>
                            <Text>
                                Selected Trail
                            </Text>
                            <Text>
                                `Selected Trail`
                            </Text>
                        </HStack>

                    </>

                </CustomModal>

            </Box>

            {/* <Footer /> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mutualStyles: {
        backgroundColor: theme.colors.background,
        flex: 1,
        flexDirection: "column",
        height: "100%",
    },
});