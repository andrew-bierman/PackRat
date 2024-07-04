import React from 'react';
import { View, ScrollView } from 'react-native';
import { Desktop, Mobile, Tablet } from '../../media';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import loadStyles from './privacy.style';
import AboutContent from './PrivacyContent';

export default function Privacy() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.menuBar}
    >
      <View style={[isDark ? styles.containerDark : styles.container]}>
        <Desktop>
          <AboutContent />
        </Desktop>
        <Tablet>
          <AboutContent />
        </Tablet>
        <Mobile>
          <AboutContent />
        </Mobile>
      </View>
    </ScrollView>
  );
}
