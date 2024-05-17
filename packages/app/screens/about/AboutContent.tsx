import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { RButton, RStack } from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useAbout from 'app/hooks/about/useAbout';
import loadStyles from './about.style';

interface AboutContentProps {
  desktopContainer: any;
  isMobile: boolean;
}

const AboutContent = ({ desktopContainer, isMobile }: AboutContentProps) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

  const styles = useCustomStyles(loadStyles);
  

  const { handleGithubLink, handleDiscordLink, aboutSections } = useAbout();

  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default AboutContent;
