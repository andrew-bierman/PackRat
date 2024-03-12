import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { format } from 'date-fns';
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useTheme from '../../hooks/useTheme';
import { RStack, RText, RButton } from '@packrat/ui';
import { Paragraph } from 'tamagui';
import { useFormContext } from 'react-hook-form';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}
interface TripDateRangeProps {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
}

const TripDateRange = ({ dateRange, setDateRange }: TripDateRangeProps) => {
  const { currentTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  const { formState } = useFormContext();

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
    <RStack
      alignSelf="center"
      $sm={{
        borderRadius: 6,
        width: '100%',
      }}
      $gtSm={{
        borderRadius: 12,
        width: '90%',
      }}
      style={{
        flexDirection: 'column',
        backgroundColor: currentTheme.colors.card,
        gap: 2,
        marginVertical: 10,
        alignItems: 'center',
        border: formState.errors.dateRange ? `2px solid ${currentTheme.colors.error}` : 'none'
      }}
    >
      <RStack
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          padding: 30,
        }}
      >
        <FontAwesome5
          name="calendar"
          size={20}
          color={currentTheme.colors.cardIconColor}
        />
        <RText
          style={{
            color: currentTheme.colors.textPrimary,
            fontSize: currentTheme.font.size,
            paddingVertical: 12,
            fontWeight: 600,
          }}
        >
          Trip Date Range
        </RText>
      </RStack>

      <RStack
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
      >
        <SafeAreaProvider>
          <RStack
            style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
          >
            {dateRange.startDate && dateRange.endDate && (
              <RStack style={{ marginBottom: 5 }}>
                <RText>Selected Date Range - </RText>
                <RText>
                  {format(dateRange?.startDate, 'MM/dd/yyyy')} -{' '}
                  {format(dateRange?.endDate, 'MM/dd/yyyy')}
                </RText>
              </RStack>
            )}

            <RButton
              width={Platform.OS === 'web' ? null : '50%'}
              onPress={() => {
                setOpen(true);
              }}
            >
              <RText style={{ color: currentTheme.colors.text }}>
                Pick Date Range
              </RText>
            </RButton>
            {
              formState.errors.dateRange && (
                <Paragraph
                  color='$red10'
                >
                  Please select a date range for the trip
                </Paragraph>
              )
            }
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
          </RStack>
        </SafeAreaProvider>
      </RStack>
    </RStack>
  );
};

export default TripDateRange;
