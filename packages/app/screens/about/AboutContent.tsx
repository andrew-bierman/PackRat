import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { RButton, RStack, RText } from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useAbout from 'app/hooks/about/useAbout';
import loadStyles from './about.style';
import Layout from 'app/components/layout/Layout';

interface AboutContentProps {
  desktopContainer: any;
  isMobile: boolean;
}

const AboutContent = ({ desktopContainer, isMobile }: AboutContentProps) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

  const styles = useCustomStyles(loadStyles);

  const {
    handleGithubLink,
    handleDiscordLink,
    handlePrivacyLink,
    aboutSections,
  } = useAbout();

  return (
    <Layout>
      <ScrollView>
        <View style={styles.textContainer}>
          <View style={styles.headerContainer}>
            <Text style={[isDark ? styles.headerDark : styles.header]}>
              About PackRat
            </Text>
          </View>

          {aboutSections.map((section, index) => (
            <Text
              key={index}
              style={[isDark ? styles.tertiaryBlue : styles.text]}
            >
              {section}
            </Text>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <RButton style={styles.githubButton} onPress={handleGithubLink}>
            <RStack style={{ flexDirection: 'row' }}>
              <FontAwesome
                name="github"
                style={[isDark ? styles.githubIconDark : styles.githubIcon]}
              />
              <Text
                style={[isDark ? styles.githubtertiaryBlue : styles.githubText]}
              >
                View on GitHub
              </Text>
            </RStack>
          </RButton>
          <RText onPress={handlePrivacyLink}>
            <Text style={{ color: currentTheme.colors.text }}>
              Privacy Policy
            </Text>
          </RText>
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
      </ScrollView>
    </Layout>
  );
};

export default AboutContent;
