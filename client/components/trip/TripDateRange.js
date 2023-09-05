import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { Stack, Box, Text, Button, HStack } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { format } from 'date-fns';
// import { Button } from 'react-native-paper';
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';

const TripDateRange = ({ dateRange, setDateRange }) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const [open, setOpen] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setDateRange({ startDate, endDate });
    },
    [setOpen],
  );

  useEffect(() => {
    registerTranslation('en', enGB);
  }, []);

  return (
    <Stack
      alignSelf="center"
      w={['100%', '100%', '100%', '90%']}
      rounded={['none', 'none', 'md', 'lg']}
      style={{
        flexDirection: 'column',
        backgroundColor: currentTheme.colors.card,
        gap: 2,
        marginVertical: 10,

        alignItems: 'center',
      }}
    >
      <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <FontAwesome5
          name="calendar"
          size={20}
          color={currentTheme.colors.cardIconColor}
        />
        <Text
          style={{
            color: currentTheme.colors.textPrimary,
            fontSize: currentTheme.font.size,
            paddingVertical: 12,
            fontWeight: 600,
          }}
        >
          Trip Date Range
        </Text>
      </Box>

      <Box
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
      >
        <SafeAreaProvider>
          <View
            style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
          >
            {dateRange.startDate && dateRange.endDate && (
              <HStack style={{ marginBottom: 5 }}>
                <Text>Selected Date Range - </Text>
                <Text>
                  {format(dateRange?.startDate, 'MM/dd/yyyy')} -{' '}
                  {format(dateRange?.endDate, 'MM/dd/yyyy')}
                </Text>
              </HStack>
            )}

            <Button
              width={Platform.OS === 'web' ? null : '50%'}
              onPress={() => {
                setOpen(true);
              }}
            >
              <Text style={{ color: currentTheme.colors.text }}>
                Pick Date Range
              </Text>
            </Button>
            <DatePickerModal
              locale="en"
              label="Select Date"
              mode="range"
              visible={open}
              validRange={{
                startDate: new Date(),
              }}
              onDismiss={onDismiss}
              startDate={dateRange?.startDate}
              endDate={dateRange?.endDate}
              onConfirm={onConfirm}
            />
          </View>
        </SafeAreaProvider>
      </Box>
    </Stack>
  );
};

export default TripDateRange;
