import React from 'react';
import { View, Platform } from 'react-native';
import { Desktop, Mobile, Tablet } from '../../media';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import loadStyles from './about.style';
import AboutContent from './AboutContent';
import { RScrollView } from '@packrat/ui';

export default function About() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  return Platform.OS === 'web' ? (
    <RScrollView
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
    </RScrollView>
  ) : (
    <View style={[isDark ? styles.containerDark : styles.container]}>
      <AboutContent desktopContainer={styles.logoContainer} isMobile={true} />
    </View>
  );
}
