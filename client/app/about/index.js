import { View, StyleSheet, Text, Image, Platform } from "react-native";
import packratlogo from "../../assets/packrat.png";
import { theme } from "../../theme";
import { Desktop, Mobile, Tablet } from "../../media";


const AboutContent = ({ desktopContainer, isMobile }) => {
    return <View>
        <View style={styles.textContainer} >
            <Text style={{ fontSize: 18, letterSpacing: 3 }} >PackRat is the ultimate adventure planner designed for those who love to explore the great outdoors. Our app helps users plan and organize their trips with ease, whether it's a weekend camping trip, a day hike, or a cross-country road trip.
                With PackRat, you can create and manage trips, discover new destinations, and stay informed with up-to-date weather forecasts. Our app integrates with Mapbox to provide you with accurate maps and directions to your destinations, as well as suggestions for popular outdoor activities based on the location and season of your trip.
               So pack your bags, grab your friends, and get ready for your next adventure with PackRat!</Text>

        </View>
        <View style={desktopContainer}>
            <Image
                style={isMobile ? styles.mobileLogo : styles.logo}
                source={packratlogo}
            />
        </View>
    </View>
};




export default function About() {
    return Platform.OS === "web" ? (
        <View style={styles.mainConatainer}>
            <Desktop>
                <AboutContent
                    desktopContainer={styles.webLogoContainer}
                />
            </Desktop>
            <Tablet>
                <AboutContent
                    desktopContainer={styles.mobileContainer}
                    isMobile={true}
                />
            </Tablet>
            <Mobile>
                <AboutContent
                    desktopContainer={styles.mobileContainer}
                    isMobile={true}
                />
            </Mobile>
        </View>
    ) : (
        <>
            <View style={styles.mainConatainer}
            >
                <View style={styles.textContainer} >
                    <Text style={{ fontSize: 18, letterSpacing: 3 }} >PackRat is the ultimate adventure planner designed for those who love to explore the great outdoors. Our app helps users plan and organize their trips with ease, whether it's a weekend camping trip, a day hike, or a cross-country road trip.

                        With PackRat, you can create and manage trips, discover new destinations, and stay informed with up-to-date weather forecasts. Our app integrates with Mapbox to provide you with accurate maps and directions to your destinations, as well as suggestions for popular outdoor activities based on the location and season of your trip.

                        So pack your bags, grab your friends, and get ready for your next adventure with PackRat!</Text>

                </View>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.smallLogo}
                        source={packratlogo}
                    />
                </View>
            </View>
        </>

    );
}


const styles = StyleSheet.create({
    mainConatainer: {
        flex: 1,
        backgroundColor: "white",
    },
    textContainer: {
        padding: 20
    },
    logoContainer: {
        width: "50%",
        height: "20%",
        backgroundColor: theme.colors.background,
        alignSelf: "center"
    },
    webLogoContainer: {
        width: "25%",
        height: "60%",
        backgroundColor: theme.colors.background,
        alignSelf: "center",
        justifyContent:"center"
    },
    mobileContainer: {
        width: "50%",
        height: "20%",
        backgroundColor: theme.colors.background,
        alignSelf: "center",
    },
    mobileLogo: {
        width: 160,
        height: 150,
        alignSelf: "center"
    },
    logo: {
        width: 250,
        height: 150,
        alignItems:"center",
        alignSelf: "center"
    },
    smallLogo: {
        width: "100%",
        height: "100%",
    },
});
