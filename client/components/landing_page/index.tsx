import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, ScrollView, Platform, View } from 'react-native';
import {
  Container,
  Button,
  Icon,
  Text,
  Card,
  Box,
  VStack,
  HStack,
} from 'native-base';
import useTheme from '../../hooks/useTheme';
import { useRouter } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme';
import useCustomStyles from '~/hooks/useCustomStyles';

const dataArray = [
  {
    title: 'Create and manage trips',
    content:
      'Easily create new trips and manage existing ones by adding details such as dates, locations, and activities.',
    iconName: 'directions',
  },
  {
    title: 'Map integration with route planning',
    content:
      'PackRat integrates with OpenStreetMap to provide users with accurate maps and directions to their destinations.',
    iconName: 'map',
  },
  {
    title: 'Activity suggestions',
    content:
      'The app suggests popular outdoor activities based on the location and season of the trip.',
    iconName: 'landscape',
  },
  {
    title: 'Packing list',
    content:
      'Users can create and manage packing lists for their trips to ensure they have everything they need.',
    iconName: 'backpack',
  },
  {
    title: 'Weather forecast',
    content:
      'PackRat provides up-to-date weather forecasts for the trip location to help users prepare accordingly.',
    iconName: 'wb-sunny',
  },
  {
    title: 'Save your hikes and packs, and sync between devices',
    content:
      'User authentication ensures privacy and data security, while enabling you to save and sync your hikes and packs between devices.',
    iconName: 'lock',
  },
];

const CustomAccordion = ({ title, content, iconName }) => {
  const [expanded, setExpanded] = useState(false);
  const styles = useCustomStyles(loadStyles);

  /**
   * Toggles the value of 'expanded' and updates the state.
   *
   * @return {void} No return value
   */
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
        <Button
          transparent
          style={styles.transparentButton}
          onPress={toggleExpanded}
        >
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
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const router = useRouter();
  const styles = useCustomStyles(loadStyles);
  const isWeb = Platform.OS === 'web';
  return (
    <>
      <VStack style={styles.container}>
        <Box
          style={{
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
            paddingVertical: isWeb ? 18 : 0,
            marginTop: isWeb ? 25 : 0,
          }}
        >
          {isWeb && (
            <Text
              style={{
                color: 'white',
                fontSize: isWeb ? currentTheme.font.headerFont : 16,
                fontWeight: 600,
              }}
            >
              PackRat
            </Text>
          )}
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
            The Ultimate Travel App
          </Text>
          <Container style={styles.contentContainer}>
            <Text style={styles.introText}>
              PackRat is the ultimate adventure planner designed for those who
              love to explore the great outdoors. Plan and organize your trips
              with ease, whether it's a weekend camping trip, a day hike, or a
              cross-country road trip.
            </Text>
            {Platform.OS === 'web' && (
              <View style={styles.appBadges}>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Button title="App Store" style={{ marginRight: 10 }}>
                    <HStack space={2} alignItems="center">
                      <MaterialCommunityIcons
                        name="apple"
                        size={44}
                        color="white"
                      />
                      <Text style={{ color: 'white' }}>
                        Download on the App Store
                      </Text>
                    </HStack>
                  </Button>
                  <Button title="Google Play">
                    <HStack space={2} alignItems="center">
                      <MaterialCommunityIcons
                        name="google-play"
                        size={44}
                        color="white"
                      />
                      <Text style={{ color: 'white' }}>
                        Download on Google Play
                      </Text>
                    </HStack>
                  </Button>
                </View>
                <Button title="Web" style={{ marginTop: 10, width: '100%' }}>
                  <HStack space={2} alignItems="center">
                    <MaterialCommunityIcons
                      name="web"
                      size={44}
                      color="white"
                    />
                    <Text style={{ color: 'white' }}>Use on Web</Text>
                  </HStack>
                </Button>
              </View>
            )}
            <View>
              {dataArray.map((item, index) => (
                <CustomAccordion
                  key={index}
                  title={item.title}
                  content={item.content}
                  iconName={item.iconName}
                />
              ))}
            </View>
          </Container>
        </Box>
        <Box style={styles.buttonContainer}>
          <Button
            full
            style={styles.getStartedButton}
            onPress={() => {
              router.push('/sign-in');
            }}
          >
            <Text style={styles.footerText}>Get Started</Text>
          </Button>
        </Box>
      </VStack>
    </>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  const isWeb = Platform.OS === 'web';
  return {
    mutualStyles: {
      backgroundColor: currentTheme.colors.background,
      flex: 1,
      flexDirection: 'column',
      height: '100%',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 5,
      backgroundColor: currentTheme.colors.background,
      height: '100%',
      width: '100%',
    },
    secondaryContentContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: currentTheme.colors.background,
    },
    appBadges: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
      marginBottom: 20,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    introText: {
      fontSize: isWeb ? 24 : 14,
      textAlign: 'justify',
      marginVertical: 15,
      color: currentTheme.colors.text,
    },
    card: {
      marginBottom: 10,
      minWidth: '100%',
      backgroundColor: currentTheme.colors.secondaryBlue,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    transparentButton: {
      backgroundColor: 'transparent',
    },
    icon: {
      fontSize: isWeb ? 28 : 18,
      color: '#34a89a',
      marginRight: 10,
    },
    featureText: {
      fontWeight: 'bold',
      fontSize: isWeb ? 18 : 14,
      color: currentTheme.colors.text,
    },
    cardContent: {
      fontSize: isWeb ? 16 : 12,
      color: currentTheme.colors.text,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      alignItems: 'center',
    },
    getStartedButton: {
      backgroundColor: '#34a89a',
      width: isWeb ? '30%' : '50%',
      borderRadius: 13,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerText: {
      color: currentTheme.colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
  };
};

export default LandingPage;
