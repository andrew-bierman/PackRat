import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Platform, View } from 'react-native';
import { RButton, RCard, RText, RStack } from '@packrat/ui';
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
    <RCard style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialIcons name={iconName} style={styles.icon} />
        <View style={{ flex: 1 }}>
          <RText style={styles.featureText}>{title}</RText>
        </View>
        <RButton
          backgroundColor="transparent"
          style={styles.transparentButton}
          onPress={toggleExpanded}
        >
          <MaterialIcons
            name={expanded ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
            style={styles.icon}
          />
        </RButton>
      </View>
      {expanded && (
        <RCard.Header>
          <RText style={styles.cardContent}>{content}</RText>
        </RCard.Header>
      )}
    </RCard>
  );
};

const LandingPage = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  return (
    <RStack style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          textAlign: 'center',
          paddingVertical: 18,
          marginTop: Platform.OS !== 'web' ? 25 : 1,
        }}
      >
        {Platform.OS === 'web' ? (
          <RText
            style={{ color: 'white', fontSize: currentTheme.font.headerFont }}
          >
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
      </View>
      <View style={styles.secondaryContentContainer}>
        {/* <ImageBackground
          source={require("../../assets/background-image.png")}
          style={styles.backgroundImage}
        > */}
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <RText style={styles.introText}>
            PackRat is the ultimate adventure planner designed for those who
            love to explore the great outdoors. Plan and organize your trips
            with ease, whether it's a weekend camping trip, a day hike, or a
            cross-country road trip.
          </RText>
          {Platform.OS === 'web' && (
            <View style={styles.appBadges}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <RButton
                  title="App Store"
                  style={{ margin: 10, padding: 32 }}
                >
                  <RStack
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="apple"
                      size={44}
                      color="white"
                    />
                    <RText style={{ color: 'white' }}>
                      Download on the App Store
                    </RText>
                  </RStack>
                </RButton>
                <RButton
                  title="Google Play"
                  style={{ margin: 10, padding: 32 }}
                >
                  <RStack
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="google-play"
                      size={44}
                      color="white"
                    />
                    <RText style={{ color: 'white' }}>
                      Download on Google Play
                    </RText>
                  </RStack>
                </RButton>
              </View>
              <RButton
                title="Web"
                style={{ margin: 10, padding: 32, width: '100%' }}
              >
                <RStack
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <MaterialCommunityIcons name="web" size={44} color="white" />
                  <RText style={{ color: 'white' }}>Use on Web</RText>
                </RStack>
              </RButton>
            </View>
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
        </View>
        <View style={styles.buttonContainer}>
          <RButton
            style={styles.getStartedButton}
            onPress={() => {
              /* Add navigation to the sign in screen */
            }}
          >
            <RText style={styles.footerText}>Get Started</RText>
          </RButton>
        </View>
        <StatusBar style="auto" />
        {/* </ImageBackground> */}
      </View>
    </RStack>
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
      width: '80%',
      lineHeight: 1.5,
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
