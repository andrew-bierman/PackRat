import { View, StyleSheet, Text, Image } from "react-native";
import { Stack as Header } from "expo-router";
import ProfileContainer from "../../components/user/ProfileContainer";
import { Link } from "expo-router";
import { AntDesign, Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../theme";
import { Box } from "native-base";


export default function Drawer() {
    return Platform.OS === "web" ? (
        <>
            <Header.Screen
                options={{
                    // https://reactnavigation.org/docs/headers#setting-the-header-title
                    title: "Drawer",
                    // https://reactnavigation.org/docs/headers#adjusting-header-styles

                    // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
                }}
            />

            <Box>
                <Text>Web-view</Text>
            </Box>
        </>
    ) : (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white"
                }}
            >
                <View style={styles.closeIcon}>
                    <Link href='/'>
                        <AntDesign
                            name="close"
                            size={35}
                            color={theme.colors.drawerIconColor}
                        // onPress={() => setIsMenuOpen(false)}
                        />
                    </Link>
                </View>
                <Link href="/">
                    <View style={styles.link}>
                        <Entypo name="home" size={24} color={theme.colors.drawerIconColor} />

                        <Text style={{ color: "#3B3B3B" }}>Home</Text>
                    </View>
                </Link>
                <Link href="profile">
                    <View style={styles.link}>
                        <FontAwesome name="book" size={24} color={theme.colors.drawerIconColor} />
                        <Text style={{ color: "#3B3B3B" }}>Profile</Text>
                    </View>
                </Link>
                <Link href="/packs">
                    <View style={styles.link}>
                        <MaterialIcons
                            name="backpack"
                            size={24}
                            color={theme.colors.drawerIconColor}
                        />

                        <Text style={{ color: "#3B3B3B" }}>Packs</Text>
                    </View>
                </Link>
                <View style={styles.link}>
                    <MaterialIcons name="logout" size={24} color={theme.colors.drawerIconColor} />
                    <Text style={{ color: "#3B3B3B" }} onPress={() => signOut()}>
                        Logout
                    </Text>
                </View>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    mobileContainer: {
        backgroundColor: theme.colors.background,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 25,
        position: "relative",
    },

    logo: {
        width: 60,
        height: 50,
    },
    smallLogo: {
        width: 100,
        height: 95,
    },

    link: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingVertical: 20,
        paddingHorizontal: 15,
        width: "100%",
        color: "black",
    },
    closeIcon: {
        flexDirection: "row",
        alignSelf: "flex-end",
        justifyContent: "flex-end",
        paddingVertical: 20,
        paddingHorizontal: 25,
        width: "100%",
        color: "black",

    }
});
