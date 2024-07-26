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
import {
  RStack as OriginalRStack,
  RText as OriginalRText,
  RButton as OriginalRButton,
} from '@packrat/ui';

const RStack: any = OriginalRStack;
const RText: any = OriginalRText;
const RButton: any = OriginalRButton;

export interface DateRange {
  start_date: Date | null;
  end_date: Date | null;
}
interface TripDateRangeProps {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
}

const TripDateRange = ({ dateRange, setDateRange }: TripDateRangeProps) => {
  const { currentTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setDateRange({ start_date: startDate, end_date: endDate });
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
            color: currentTheme.colors.textPrimaryPrimary,
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
            {dateRange.start_date && dateRange.end_date && (
              <RStack style={{ marginBottom: 5 }}>
                <RText>Selected Date Range - </RText>
                <RText>
                  {format(dateRange?.start_date, 'MM/dd/yyyy')} -{' '}
                  {format(dateRange?.end_date, 'MM/dd/yyyy')}
                </RText>
              </RStack>
            )}

            <RButton
              width={Platform.OS === 'web' ? null : '50%'}
              onPress={() => {
                setOpen(true);
              }}
            >
              <RText style={{ color: currentTheme.colors.textPrimary }}>
                Pick Date Range
              </RText>
            </RButton>
            <DatePickerModal
              locale="en"
              label="Select Date"
              mode="range"
              visible={open}
              validRange={{
                startDate: new Date(),
              }}
              onDismiss={onDismiss}
              startDate={dateRange?.start_date as any}
              endDate={dateRange?.end_date as any}
              onConfirm={onConfirm}
            />
          </RStack>
        </SafeAreaProvider>
      </RStack>
    </RStack>
  );
};

export default TripDateRange;
