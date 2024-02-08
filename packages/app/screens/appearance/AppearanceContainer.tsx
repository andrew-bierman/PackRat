import React from 'react';
import { VStack, Box, Text, Switch } from 'native-base';
import { ScrollView } from 'tamagui';
import { Card as RNPCard } from 'react-native-paper';
import useAppearance from 'app/hooks/appearance/useAppearance';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './appearanceStyle';
import DemoCard from './DemoCard';
import ThemeSwitch from './ThemeSwitch';
import { DialogDemo } from '../../components/DialogDemo';

export default function AppearanceContainer() {
  const { isEnabled, toggleSwitch, currentTheme } = useAppearance();
  const [showKitchenSink, setShowKitchenSink] = React.useState(true);
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
          <DemoCard />
          <Box
            alignSelf="center"
            _text={styles.nativeBaseBox}
            p={4}
            bg={['primary.500']}
          >
            This is a Box from Native Base
          </Box>
          ;{/* Paper */}
          <RNPCard>
            <RNPCard.Title title="React Native Paper Card" />
          </RNPCard>
          {showKitchenSink && (
            <Box>
              <Text>Kitchen Sink</Text>
              <DialogDemo />
            </Box>
          )}
        </Box>
      </VStack>
    </ScrollView>
  );
}
