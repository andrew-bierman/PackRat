import React from 'react';
import { View, Platform, ScrollView } from 'react-native';
import { Desktop, Mobile, Tablet } from '../../media';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import loadStyles from './aboutStyles';
import AboutContent from './AboutContent';

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
