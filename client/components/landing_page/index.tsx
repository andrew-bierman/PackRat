import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Platform, View } from 'react-native';
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

import { XStack, YStack, RText, RStack, RButton } from '@packrat/ui';

import useTheme from '../../hooks/useTheme';
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
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

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
      <XStack ai='center' jc='space-between' px={20} py={10}>
        <MaterialIcons name={iconName} style={styles.icon} />
        <RStack f={1}>
          <RText fos={18} col={currentTheme.colors.text}>{title}</RText>
        </RStack>
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
      </XStack>
      {expanded && <RText fos={16} col={currentTheme.colors.text} px={20} py={10}>{content}</RText>}
    </Card>
  );
};

const LandingPage = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  return (
    <YStack style={styles.container}>
      <RStack ai='center' py={18} mt={Platform.OS != 'web' ? 25 : 1}>
        {Platform.OS === 'web' ? (
          <RText style={{ color: 'white', fontSize: currentTheme.font.headerFont }}>
            PackRat
          </RText>
        ) : (
          <RText style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>
            PackRat
          </RText>
        )}
        <RText style={{ color: 'white', fontSize: 18 }}>
          The Ultimate Travel App
        </RText>
      </RStack>
      <RStack style={styles.secondaryContentContainer}>
        {/* <ImageBackground
          source={require("../../assets/background-image.png")}
          style={styles.backgroundImage}
        > */}
        <RStack style={styles.overlay} />
        <Container style={styles.contentContainer}>
          <RText style={styles.introText}>
            PackRat is the ultimate adventure planner designed for those who
            love to explore the great outdoors. Plan and organize your trips
            with ease, whether it's a weekend camping trip, a day hike, or a
            cross-country road trip.
          </RText>
          {Platform.OS === 'web' && (
            <YStack jc='center' ai='center' my={20} mb={20}>
              <XStack jc='center' fw='wrap'>
                <Button title="App Store" style={{ margin: 10 }}>
                  <XStack space={2} ai="center">
                    <MaterialCommunityIcons
                      name="apple"
                      size={44}
                      color="white"
                    />
                    <RText col='white'>
                      Download on the App Store
                    </RText>
                  </XStack>
                </Button>
                <Button title="Google Play" style={{ margin: 10 }}>
                  <XStack space={2} ai="center">
                    <MaterialCommunityIcons
                      name="google-play"
                      size={44}
                      color="white"
                    />
                    <RText col='white'>
                      Download on Google Play
                    </RText>
                  </XStack>
                </Button>
              </XStack>
              <Button title="Web" style={{ marginTop: 10, width: '100%' }}>
                <XStack space={2} ai="center">
                  <MaterialCommunityIcons name="web" size={44} color="white" />
                  <RText col='white'>Use on Web</RText>
                </XStack>
              </Button>
            </YStack>
          )}
          <RStack>
            {dataArray.map((item, index) => (
              <CustomAccordion
                key={index}
                title={item.title}
                content={item.content}
                iconName={item.iconName}
              />
            ))}
          </RStack>
        </Container>
        <Container style={styles.buttonContainer}>
          <Button
            full
            style={styles.getStartedButton}
            onPress={() => {
              /* Add navigation to the sign in screen */
            }}
          >
            <RText col={currentTheme.colors.text} fos={18} fw='bold'>Get Started</RText>
          </Button>
        </Container>
        <StatusBar style="auto" />
        {/* </ImageBackground> */}
      </RStack>
    </YStack>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mutualStyles: {
      backgroundColor: currentTheme.colors.background,
      flex: 1,
      flexDirection: 'column',
      height: '100%',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    secondaryContentContainer: {
      flex: 1,
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    introText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: currentTheme.colors.text,
    },
    card: {
      marginBottom: 10,
      width: '100%',
      backgroundColor: currentTheme.colors.secondaryBlue,
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
      color: currentTheme.colors.text,
    },
    cardContent: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      fontSize: 16,
      color: currentTheme.colors.text,
    },
    buttonContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    getStartedButton: {
      backgroundColor: '#34a89a',
    },
    footerText: {
      color: currentTheme.colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
  };
};

export default LandingPage;
