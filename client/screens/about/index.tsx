import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { darkTheme, theme } from '../../theme';
import { Desktop, Mobile, Tablet } from '../../media';
import { RButton, RStack } from '@packrat/ui';
import * as Linking from 'expo-linking';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';
import useAbout from '~/hooks/about/useAbout';

const AboutContent = ({ desktopContainer, isMobile }) => {
  const { currentTheme, toggleSwitch, isEnabled, isDark } =
    useAppearenceContainerLogic();
  const { handleGithubLink, handleDiscordLink } = useHandleLink;

  const styles = useCustomStyles(loadStyles);
  console.log('isDark, isLight', isDark, isLight);

  const { handleGithubLink, handleDiscordLink, aboutSections } = useAbout();

  return (
    <View>
      <View style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <Text style={[isDark ? styles.headerDark : styles.header]}>
            About PackRat
          </Text>
        </View>

        {aboutSections.map((section, index) => (
          <Text key={index} style={[isDark ? styles.textDark : styles.text]}>
            {section}
          </Text>
        ))}
      </View>
      <View style={desktopContainer}>
        <RStack style={{ flexDirection: 'row' }}>
          <View style={styles.buttonContainer}>
            <RButton style={styles.githubButton} onPress={handleGithubLink}>
              <RStack style={{ flexDirection: 'row' }}>
                <FontAwesome
                  name="github"
                  style={[isDark ? styles.githubIconDark : styles.githubIcon]}
                />
                <Text
                  style={[isDark ? styles.githubTextDark : styles.githubText]}
                >
                  View on GitHub
                </Text>
              </RStack>
            </RButton>
            {/* <Button
              style={styles.discordButton}
              // onPress={handleDiscordLink}
            >
              <HStack>
                <MaterialCommunityIcons
                  name="discord"
                  style={styles.githubIcon}
                />
                <Text style={styles.githubText}>Join Us on Discord</Text>
              </HStack>
            </Button> */}
          </View>
        </RStack>
      </View>
    </View>
  );
};

export default function About() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  return Platform.OS === 'web' ? (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.menuBar}
    >
      <View style={[isDark ? styles.containerDark : styles.container]}>
        <Desktop>
          <AboutContent
            desktopContainer={styles.webLogoContainer}
            isMobile={false}
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
    </ScrollView>
  ) : (
    <View style={[isDark ? styles.containerDark : styles.container]}>
      <AboutContent desktopContainer={styles.logoContainer} isMobile={true} />
    </View>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      padding: 20,
      alignItems: 'center',
    },
    containerDark: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      padding: 20,
      alignItems: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      justifyContent: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginRight: 10,
    },
    headerDark: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginRight: 10,
    },

    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 20,
      marginTop: 20,
      marginLeft: 0,
      marginRight: 0,
    },

    githubButton: {
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: theme.colors.primary,
      margin: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 4,
      backgroundColor: '#24292E',
    },
    discordButton: {
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: theme.colors.primary,
      margin: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 4,
      backgroundColor: '#7289DA',
    },
    githubIcon: {
      fontSize: 24,
      color: currentTheme.colors.text,
      marginRight: 5,
    },
    githubIconDark: {
      fontSize: 24,
      color: currentTheme.colors.text,
      marginRight: 5,
    },
    githubText: {
      fontSize: 18,
      color: currentTheme.colors.text,
    },
    githubTextDark: {
      fontSize: 18,
      color: currentTheme.colors.text,
    },
    textContainer: {
      marginBottom: 20,
    },
    text: {
      fontSize: 18,
      lineHeight: 28,
      letterSpacing: 1,
      // fontFamily: "sans-serif",
      color: currentTheme.colors.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    textDark: {
      fontSize: 18,
      lineHeight: 28,
      letterSpacing: 1,
      // fontFamily: "sans-serif",
      color: currentTheme.colors.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    logoContainer: {
      width: '50%',
      height: 'auto',
    },
    webLogoContainer: {
      width: '25%',
      height: 'auto',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    mobileContainer: {
      width: '50%',
      height: 'auto',
      alignSelf: 'center',
    },
    mobileLogo: {
      width: 160,
      height: 150,
      alignSelf: 'center',
    },
    logo: {
      width: '100%',
      height: 'auto',
      alignSelf: 'center',
    },
  };
};
