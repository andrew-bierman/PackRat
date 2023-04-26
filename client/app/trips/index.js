import { View, StyleSheet, Text, Image } from "react-native";
import { theme } from "../../theme";
import WeatherCard from "../../components/WeatherCard";
import { Box, ScrollView, Stack } from "native-base";

export default function Trips() {

    return (
        <ScrollView>
        <Box style={styles.mutualStyles}>
            <Stack m={[0, 0, 12, 16]} style={{ gap: 25 }}>
                <WeatherCard />
            </Stack>

        </Box>
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
