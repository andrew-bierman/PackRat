import React from 'react';
import { View, Platform, ScrollView } from 'react-native';
import { Desktop, Mobile, Tablet } from '../../media';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import loadStyles from './about.style';
import AboutContent from './AboutContent';
import { useAboutContent } from './useAboutContent';

export default function About() {
  const { isDark } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const aboutContent = useAboutContent(styles, true);

  return Platform.OS === 'web' ? (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.menuBar}
    >
      <View style={[isDark ? styles.containerDark : styles.container]}>
        {aboutContent}
      </View>
    </ScrollView>
  ) : (
    <View style={[isDark ? styles.containerDark : styles.container]}>
      <AboutContent desktopContainer={styles.logoContainer} isMobile={true} />
    </View>
  );
}
