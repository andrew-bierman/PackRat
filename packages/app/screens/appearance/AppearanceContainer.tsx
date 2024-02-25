import React from 'react';
import { YStack, RStack, RText } from '@packrat/ui';
import { ScrollView } from 'tamagui';
import { Card as RNPCard } from 'react-native-paper';
import useAppearance from 'app/hooks/appearance/useAppearance';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './appearance.style';
import DemoCard from './DemoCard';
import ThemeSwitch from './ThemeSwitch';
import { DialogDemo } from '../../components/DialogDemo';
import { RScrollView } from '@packrat/ui';

export default function AppearanceContainer() {
  const { isEnabled, toggleSwitch, currentTheme } = useAppearance();
  const [showKitchenSink, setShowKitchenSink] = React.useState(true);
  const styles = useCustomStyles(loadStyles);

  return (
    <ScrollView>
      <YStack style={styles.mainContainer}>
        <RStack style={styles.infoSection}>
          <ThemeSwitch
            isEnabled={isEnabled}
            toggleSwitch={toggleSwitch}
            currentTheme={currentTheme}
          />
          <DemoCard />
          {showKitchenSink && (
            <RStack>
              <RStack>
                <RText>Kitchen Sink</RText>
              </RStack>
              <DialogDemo />
            </RStack>
          )}
        </RStack>
      </YStack>
    </ScrollView>
  );
}
