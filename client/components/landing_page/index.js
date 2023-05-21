import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, View } from 'react-native';
import {
    Container,
    Button,
    Icon,
    Text,
    Card,
    Box,
    HStack,
    VStack,
    Image
} from 'native-base';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';

import portraitBlack from '../../assets/img/portrait_black.png';
import demoScreen from '../../assets/img/demo-screen.mp4';

const dataArray = [
    {
        title: "Create and manage trips",
        content: "Easily create new trips and manage existing ones by adding details such as dates, locations, and activities.",
        iconName: "directions",
    },
    {
        title: "Map integration with route planning",
        content: "PackRat integrates with OpenStreetMap to provide users with accurate maps and directions to their destinations.",
        iconName: "map",
    },
    {
        title: "Activity suggestions",
        content: "The app suggests popular outdoor activities based on the location and season of the trip.",
        iconName: "landscape",
    },
    {
        title: "Packing list",
        content: "Users can create and manage packing lists for their trips to ensure they have everything they need.",
        iconName: "backpack",
    },
    {
        title: "Weather forecast",
        content: "PackRat provides up-to-date weather forecasts for the trip location to help users prepare accordingly.",
        iconName: "wb-sunny",
    },
    {
        title: "Save your hikes and packs, and sync between devices",
        content: "User authentication ensures privacy and data security, while enabling you to save and sync your hikes and packs between devices.",
        iconName: "lock",
    },
];

const CustomAccordion = ({ title, content, iconName }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <Card style={styles.card}>
            <View style={styles.cardHeader}>
                <MaterialIcons name={iconName} style={styles.icon} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.featureText}>{title}</Text>
                </View>
                <Button transparent style={styles.transparentButton} onPress={toggleExpanded}>
                    <MaterialIcons
                        name={expanded ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                        style={styles.icon}
                    />
                </Button>
            </View>
            {expanded && <Text style={styles.cardContent}>{content}</Text>}
        </Card>
    );
};

const LandingPage = () => {

    return (
        // <Container>
        // <Box
        //     style={{
        //         alignItems: "center",
        //         textAlign: "center",
        //         paddingVertical: 18,
        //         marginTop: Platform.OS !== "web" ? 25 : 1,
        //     }}
        // >
        //     {Platform.OS === "web" ? (
        //         <Text style={{ color: "white", fontSize: theme.font.headerFont }}>
        //             PackRat
        //         </Text>
        //     ) : (
        //         <Text style={{ color: "white", fontSize: 20, fontWeight: 600 }}>
        //             PackRat
        //         </Text>
        //     )}
        //     <Text style={{ color: "white", fontSize: 18 }}>
        //         The Ultimate Travel App
        //     </Text>
        // </Box>
        //     <ImageBackground
        //         source={require('../../assets/background-image.png')}
        //         style={styles.backgroundImage}
        //     >
        //         <View style={styles.overlay} />
        //         <Container style={styles.contentContainer}>
        //             <Text style={styles.introText}>
        // PackRat is the ultimate adventure planner designed for those who love
        // to explore the great outdoors. Plan and organize your trips with
        // ease, whether it's a weekend camping trip, a day hike, or a
        // cross-country road trip.
        //             </Text>
        //             {dataArray.map((item, index) => (
        //                 <CustomAccordion
        //                     key={index}
        //                     title={item.title}
        //                     content={item.content}
        //                     iconName={item.iconName}
        //                 />
        //             ))}
        //         </Container>
        //         <Container style={styles.buttonContainer}>
        //             <Button full style={styles.getStartedButton} onPress={() => {/* Add navigation to the sign in screen */ }}>
        //                 <Text style={styles.footerText}>Get Started</Text>
        //             </Button>
        //         </Container>
        //         <StatusBar style='auto' />
        //     </ImageBackground>
        // </Container>


        // reference landing page https://startbootstrap.com/theme/new-age
        <Container
            style={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >

            <Container >
                <View style={styles.masthead}>
                    <View style={styles.mastheadText}>
                        <Box
                            style={{
                                alignItems: "center",
                                textAlign: "center",
                                paddingVertical: 18,
                                marginTop: Platform.OS !== "web" ? 25 : 1,
                            }}
                        >
                            {Platform.OS === "web" ? (
                                <Text style={{ color: "white", fontSize: theme.font.headerFont }}>
                                    PackRat
                                </Text>
                            ) : (
                                <Text style={{ color: "white", fontSize: 20, fontWeight: 600 }}>
                                    PackRat
                                </Text>
                            )}
                            <Text style={{ color: "white", fontSize: 18 }}>
                                The Ultimate Travel App
                            </Text>
                        </Box>
                        <Text style={styles.introText}>
                            PackRat is the ultimate adventure planner designed for those who love
                            to explore the great outdoors. Plan and organize your trips with
                            ease, whether it's a weekend camping trip, a day hike, or a
                            cross-country road trip.
                        </Text>

                        <View style={styles.appBadges}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Button title="App Store" style={{ marginRight: 10 }}>
                                    <HStack space={2} alignItems="center">
                                        <MaterialCommunityIcons name="apple" size={44} color="white" />
                                        <Text style={{ color: 'white' }}>Download on the App Store</Text>
                                    </HStack>
                                </Button>
                                <Button title="Google Play">
                                    <HStack space={2} alignItems="center">
                                        <MaterialCommunityIcons name="google-play" size={44} color="white" />
                                        <Text style={{ color: 'white' }}>Download on Google Play</Text>
                                    </HStack>
                                </Button>
                            </View>
                            <Button title="Web">
                                <HStack space={2} alignItems="center">
                                    <MaterialCommunityIcons name="web" size={44} color="white" />
                                    <Text style={{ color: 'white' }}>Use on Web</Text>
                                </HStack>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.mastheadDeviceMockup}>
                        {/* Add your media content here */}
                        {/* <Image style={styles.deviceMedia} source={require('./assets/img/demo-screen.mp4')} /> */}
                        <View style={styles.mastheadDeviceMockup}>
                            <Image style={styles.deviceMedia} source={portraitBlack} />
                            <ImageBackground>
                                <View style={styles.deviceContent}>
                                    {/* Add your content inside the device mockup */}
                                    <Text style={styles.deviceContentText}>Your Content Here</Text>
                                    <Button style={styles.deviceContentButton}>
                                        <Text style={styles.deviceContentButtonText}>Click Me</Text>
                                    </Button>
                                </View>
                            </ImageBackground>
                        </View>
                        {/* <Image style={styles.deviceMedia} source={demoScreen} /> */}
                    </View>
                </View>

                {/* Features Section */}
                <View style={styles.features}>
                    {dataArray.map((item, index) => (
                        <CustomAccordion
                            key={index}
                            title={item.title}
                            content={item.content}
                            iconName={item.iconName}
                        />
                    ))}
                </View>


                <View style={styles.quoteContainer}>

                    <LinearGradient
                        // Background Linear Gradient, left to right
                        colors={['#ffffff', '#00d1b2']}
                        start={{ x: 0.1, y: 0.2 }}
                        style={styles.linearGradientBackground}
                    >
                        <Text style={styles.quoteText}>An intuitive solution to a common problem that we all face, wrapped up in a single app!</Text>
                        {/* <Image style={styles.tnwLogo} source={require('./assets/img/tnw-logo.svg')} /> */}
                    </LinearGradient>
                </View>

                {/* Add the rest of the sections and components here */}
            </Container>

        </Container>
    );
};

const styles = StyleSheet.create({
    mutualStyles: {
        backgroundColor: theme.colors.background,
        flex: 1,
        flexDirection: "column",
        height: "100%",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    introText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: theme.colors.text,
    },
    card: {
        marginBottom: 10,
        width: '100%',
        backgroundColor: theme.colors.secondaryBlue
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    transparentButton: {
        backgroundColor: 'transparent',
    },
    icon: {
        fontSize: 28,
        color: '#34a89a',
        marginRight: 10,
    },
    featureText: {
        fontSize: 18,
        color: theme.colors.text,
    },
    cardContent: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        color: theme.colors.text,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    getStartedButton: {
        backgroundColor: '#34a89a',
    },
    footerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // New styles
    mastheadDeviceMockup: {
        position: 'relative',
        marginBottom: 30,
    },
    deviceMedia: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
    deviceContent: {
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: [{ translateX: '-50%' }],
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    deviceContentText: {
        color: 'white',
        fontSize: 24,
        marginBottom: 10,
    },
    deviceContentButton: {
        backgroundColor: '#34a89a',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    deviceContentButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    appBadge: {
        marginRight: 10,
        width: 150,
        height: 50,
    },
    masthead: {
        paddingTop: 100,
        paddingBottom: 100,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    mastheadText: {
        textAlign: 'center',
        marginBottom: 30,
    },
    mastheadDescription: {
        fontSize: 24,
        marginBottom: 30,
    },
    mastheadDeviceMockup: {
        position: 'relative',
        marginBottom: 30,
    },
    deviceMockup: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    deviceMedia: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
    quoteContainer: {
        paddingTop: 100,
        paddingBottom: 100,
        textAlign: 'center',
        color: 'white',
    },
    quoteText: {
        fontSize: 32,
        marginBottom: 30,
    },
    tnwLogo: {
        height: 48,
        marginBottom: 30,
    },
    features: {
        paddingTop: 100,
        paddingBottom: 100,
        backgroundColor: 'light',
    },
    featureItem: {
        marginBottom: 30,
    },
    featureIcon: {
        fontSize: 64,
        marginBottom: 20,
    },
    featureTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    featureDescription: {
        marginBottom: 0,
    },
    basicFeatures: {
        paddingTop: 100,
        paddingBottom: 100,
        backgroundColor: 'white',
        textAlign: 'center',
    },
    basicFeaturesTitle: {
        fontSize: 48,
        lineHeight: 1,
        marginBottom: 30,
    },
    basicFeaturesText: {
        fontSize: 18,
        marginBottom: 30,
    },
    cta: {
        paddingTop: 100,
        paddingBottom: 100,
        textAlign: 'center',
        color: 'white',
    },
    ctaTitle: {
        fontSize: 64,
        lineHeight: 1,
        marginBottom: 30,
    },
    ctaButton: {
        fontSize: 24,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 50,
        textDecoration: 'none',
        color: 'white',
        backgroundColor: 'transparent',
        border: '2px solid white',
        transition: 'all 0.3s ease',
    },
    ctaButtonHover: {
        backgroundColor: 'white',
        color: 'black',
    },
    appBadgeSection: {
        paddingTop: 100,
        paddingBottom: 100,
        textAlign: 'center',
        backgroundColor: 'linear-gradient(to right, #4F9FFF, #AEB2E5)',
        color: 'white',
    },
    appBadgeTitle: {
        fontSize: 48,
        lineHeight: 1,
        marginBottom: 30,
    },
    appBadgeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    appBadge: {
        marginRight: 10,
        width: 150,
        height: 50,
    },
    footer: {
        backgroundColor: 'black',
        color: 'white',
        padding: '20px 0',
        marginTop: 100,
    },
    footerText: {
        fontSize: 14,
        marginBottom: 10,
    },
    footerLink: {
        color: 'white',
        textDecoration: 'none',
        marginRight: 10,
    },
    feedbackModal: {
        textAlign: 'center',
    },
    feedbackModalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    feedbackModalCloseButton: {
        color: 'white',
    },
    feedbackModalForm: {
        border: 'none',
        padding: '20px 40px',
    },
    feedbackModalInput: {
        marginBottom: 20,
        padding: '10px 15px',
        borderRadius: 5,
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: 16,
    },
    feedbackModalTextarea: {
        marginBottom: 20,
        padding: '10px 15px',
        borderRadius: 5,
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: 16,
        resize: 'vertical',
    },
    feedbackModalSubmitButton: {
        padding: '10px 20px',
        borderRadius: 5,
        border: 'none',
        backgroundColor: 'blue',
        color: 'white',
        fontSize: 16,
        cursor: 'pointer',
    },
    linearGradientBackground: {
        width: '100%',
        height: '100%',
    },
});

export default LandingPage;
