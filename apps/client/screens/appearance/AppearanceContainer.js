import React, { useEffect, useState } from 'react';
import { VStack, Box, Text, Switch } from 'native-base';
import { StyleSheet } from 'react-native';
import useTheme from '../../hooks/useTheme';
import {
  Paragraph,
  Card,
  H2,
  XStack,
  Button,
  Image,
  ScrollView,
} from 'tamagui';
import { Card as RNPCard } from 'react-native-paper';
import { DialogDemo } from '../../components/dialog';
import useCustomStyles from '~/hooks/useCustomStyles';
import { Scroll } from '@tamagui/lucide-icons';

export default function AppearanceContainer() {
  const { enableDarkMode, enableLightMode, currentTheme, isDark } = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const [showKitchenSink, setShowKitchenSink] = useState(true);
  const styles = useCustomStyles(loadStyles);

  /**
   * Toggles the switch between dark mode and light mode.
   *
   * @return {boolean} The new state of the switch.
   */
  const toggleSwitch = () => {
    setIsEnabled((prevIsEnabled) => {
      const newState = !prevIsEnabled;
      newState ? enableDarkMode() : enableLightMode();
      return newState;
    });
  };

  useEffect(() => {
    setIsEnabled(isDark); // synchronize isEnabled with isDark whenever isDark changes
  }, [isDark]);

  return (
    <ScrollView>
      <VStack style={styles.mainContainer}>
        <Box style={styles.infoSection}>
          <Text style={{ color: currentTheme.colors.drawerIconColor }}>
            Theme Changer
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={{ color: currentTheme.colors.drawerIconColor }}>
            {isEnabled ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <DemoCard
            // animation="bouncy"
            size="$4"
            width={250}
            height={300}
            scale={0.9}
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}
          />
          <Box>
            <Box
              alignSelf="center" // bg="primary.500"
              _text={{
                fontSize: 'md',
                fontWeight: 'medium',
                color: 'amber.100',
                letterSpacing: 'lg',
              }}
              p={4}
              bg={['primary.500']}
            >
              This is a Box from Native Base
            </Box>
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

export function DemoCard(props) {
  return (
    <Card elevate size="$4" bordered {...props}>
      <Card.Header padded>
        <H2>Sony A7IV</H2>
        <Paragraph theme="alt2">Now available</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$10">Purchase</Button>
      </Card.Footer>
      {/* <Card.Background>

      </Card.Background> */}
    </Card>
  );
}
const loadStyles = () => ({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  infoSection: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 12,
    padding: 20,
  },
});
