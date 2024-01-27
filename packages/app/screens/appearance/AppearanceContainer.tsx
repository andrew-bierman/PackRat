import React from 'react';
import { VStack, Box, Text, Switch } from 'native-base';
import { ScrollView } from 'tamagui';
import { Card as RNPCard } from 'react-native-paper';
import useAppearance from 'app/hooks/appearance/useAppearance';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './appearanceStyle';
import DemoCard from './DemoCard';
import KitchenSink from './KitchenSink';
import ThemeSwitch from './ThemeSwitch';
import NativeBaseBox from './NativeBaseBox';
import PaperCard from './PaperCard';

export default function AppearanceContainer() {
  const { isEnabled, toggleSwitch, currentTheme } = useAppearance();
  const styles = useCustomStyles(loadStyles);

  return (
    <ScrollView>
      <VStack style={styles.mainContainer}>
        <Box style={styles.infoSection}>
          <ThemeSwitch
            isEnabled={isEnabled}
            toggleSwitch={toggleSwitch}
            currentTheme={currentTheme}
          />
          <DemoCard isEnabled={isEnabled} />
          <NativeBaseBox />
          <PaperCard />
          <KitchenSink />
        </Box>
      </VStack>
    </ScrollView>
  );
}
