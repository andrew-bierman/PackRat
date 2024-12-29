import {
  DatePickerProvider,
  DatePickerProvider as _DatePickerProvider,
  useDatePickerContext,
} from '@rehookify/datepicker';
import type { DPDay } from '@rehookify/datepicker';
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';
import { useEffect, useMemo, useState } from 'react';
import type { GetProps } from 'tamagui';
import { AnimatePresence, Button, H3, Separator, View } from 'tamagui';
import { DatePicker } from './common/dateParts';
import {
  DatePickerInput,
  HeaderTypeProvider,
  MonthPicker,
  SizableText,
  YearPicker,
  YearRangeSlider,
  swapOnClick,
  useHeaderType,
} from './common/dateParts';
import { Platform } from 'react-native';
import { useDateAnimation } from './DatePicker';
import useTheme from 'app/hooks/useTheme';

const RANGE_STYLE: { [key: string]: GetProps<typeof View> } = {
  'in-range': {
    borderRadius: 0,
    backgroundColor: '$color12',
  },
  'range-start': {
    backgroundColor: '$color1',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  'range-end': {
    backgroundColor: '$color1',
    borderWidth: 1,
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  'will-be-in-range': {
    backgroundColor: '$gray3',
    borderRadius: 0,
  },
  'will-be-range-start': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  'will-be-range-end': {
    backgroundColor: '$color1',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  '': {},
};

function Calendar({
  calenderIndex = 0,
  order,
}: {
  calenderIndex?: number;
  order?: 'first' | 'last';
}) {
  const { setHeader } = useHeaderType();
  const {
    data: { calendars, weekDays },
    propGetters: { dayButton, subtractOffset },
  } = useDatePickerContext();

  const { days, year, month } = calendars[calenderIndex] || {};

  // divide days array into sub arrays that each has 7 days, for better stylings
  const subDays = useMemo(
    () =>
      calendars[calenderIndex]?.days?.reduce((acc, day, i) => {
        if (i % 7 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1]?.push(day);
        return acc;
      }, [] as DPDay[][]) ?? [],
    [calendars, calenderIndex],
  );

  const { prevNextAnimation, prevNextAnimationKey } = useDateAnimation({
    listenTo: 'month',
  });

  return (
    <View flexDirection="column" gap="$4">
      <View
        flexDirection="row"
        minWidth="100%"
        height={50}
        alignItems="center"
        justifyContent="space-between"
      >
        {order === 'first' ? (
          <Button
            circular
            size="$4"
            {...swapOnClick(subtractOffset({ months: 1 }))}
          >
            <Button.Icon scaleIcon={1.5}>
              <ChevronLeft />
            </Button.Icon>
          </Button>
        ) : (
          <View />
        )}
        <View flexDirection="column" height={50} alignItems="center">
          <SizableText
            onPress={() => setHeader('year')}
            selectable
            tabIndex={0}
            size="$4"
            cursor="pointer"
            color="$color11"
            hoverStyle={{
              color: '$color12',
            }}
          >
            {year}
          </SizableText>
          <SizableText
            onPress={() => setHeader('month')}
            selectable
            tabIndex={0}
            cursor="pointer"
            size="$6"
            color="$gray12"
            fontWeight="600"
            lineHeight="$1"
            hoverStyle={{
              color: '$gray10',
            }}
          >
            {month}
          </SizableText>
        </View>
        {Platform.select({
          web:
            order === 'last' ? (
              <Button
                circular
                size="$4"
                {...swapOnClick(subtractOffset({ months: -1 }))}
              >
                <Button.Icon scaleIcon={1.5}>
                  <ChevronRight />
                </Button.Icon>
              </Button>
            ) : (
              <View />
            ),
          native: (
            <Button
              circular
              size="$4"
              {...swapOnClick(subtractOffset({ months: -1 }))}
            >
              <Button.Icon scaleIcon={1.5}>
                <ChevronRight />
              </Button.Icon>
            </Button>
          ),
        })}
      </View>
      <AnimatePresence key={prevNextAnimationKey}>
        <View
          // animation="medium"
          {...prevNextAnimation()}
          gap="$3"
        >
          <View flexDirection="row" gap="$1">
            {weekDays.map((day) => (
              <SizableText
                theme="alt1"
                key={day}
                ta="center"
                width={45}
                size="$4"
              >
                {day}
              </SizableText>
            ))}
          </View>
          <View flexDirection="column" gap="$1" flexWrap="wrap">
            {subDays.map((days) => (
              <View
                flexDirection="row"
                key={days[0]?.$date.toString() ?? `row-${Math.random()}`}
              >
                {days.map((d) => {
                  return (
                    <Button
                      key={d.$date.toString()}
                      chromeless
                      circular
                      padding={0}
                      minWidth={46}
                      {...swapOnClick(dayButton(d))}
                      backgroundColor={
                        d.selected && d.inCurrentMonth
                          ? '$background'
                          : 'transparent'
                      }
                      themeInverse={d.selected}
                      {...RANGE_STYLE[d.range]}
                      data-range={d.range}
                      disabled={!d.inCurrentMonth}
                      {...(d.range === 'in-range' || d.selected
                        ? {
                            hoverStyle: {
                              backgroundColor: 'transparent',
                            },
                          }
                        : {})}
                    >
                      <Button.Text
                        color={
                          d.selected
                            ? '$gray12'
                            : d.inCurrentMonth
                              ? '$gray11'
                              : '$gray6'
                        }
                      >
                        {d.day}
                      </Button.Text>
                    </Button>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </AnimatePresence>
    </View>
  );
}

function DatePickerBody() {
  const [header, setHeader] = useState<'month' | 'year' | 'day'>('day');

  const {
    data: { calendars, years },
    propGetters: { subtractOffset, previousYearsButton, nextYearsButton },
  } = useDatePickerContext();

  return (
    <HeaderTypeProvider type={header} setHeader={setHeader}>
      <View flexDirection="row" gap="$3">
        {header === 'day' && (
          <>
            <Calendar order="first" calenderIndex={1} />
            <Separator vertical />
            <Calendar order="last" calenderIndex={0} />
          </>
        )}
        {header === 'year' && (
          <View alignItems="center" gap="$2">
            <YearRangeSlider />
            <YearPicker onChange={() => setHeader('day')} />
          </View>
        )}
        {header === 'month' && (
          <View gap="$4">
            <H3 size="$7" alignSelf="center">
              Select a month
            </H3>
            <MonthPicker
              onChange={() => {
                setHeader('day');
              }}
            />
          </View>
        )}
      </View>
    </HeaderTypeProvider>
  );
}

interface RangePickerProps {
  selectedDates: Date[];
  onDatesChange: (dates: Date[]) => void;
  offsetDate?: Date;
  onOffsetChange?: (date: Date) => void;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

export function RangePicker({
  selectedDates,
  onDatesChange,
  offsetDate,
  onOffsetChange,
  open,
  setOpen,
}: RangePickerProps) {
  useEffect(() => {
    if (selectedDates.length === 2) {
      setOpen(false);
    }
  }, [selectedDates]);
  const { currentTheme } = useTheme();

  // uncomment this to limit the range of dates
  //   const M = now.getMonth()
  //   const Y = now.getFullYear()
  //   const D = now.getDate()
  return (
    <DatePicker open={open} onOpenChange={setOpen}>
      <DatePicker.Trigger asChild>
        <DatePickerInput
          value={`${selectedDates[0]?.toDateString() || ''}${
            selectedDates[0] && selectedDates[1] ? ' - ' : ''
          }${selectedDates[1]?.toDateString() || ''}`}
          placeholder="Start date - End date"
          onReset={() => {
            onDatesChange([]);
          }}
          onButtonPress={() => setOpen(true)}
          width={260}
          color={currentTheme.colors.text}
        />
      </DatePicker.Trigger>

      <DatePicker.Content>
        <DatePicker.Content.Arrow />
        <DatePickerProvider
          config={{
            selectedDates,
            onDatesChange,
            offsetDate,
            onOffsetChange,
            dates: {
              mode: 'range',
              // limit years to 2 years before and after current year
              //   minDate: new Date(Y, M - 2, 1),
              //   maxDate: new Date(Y, M + 2, 0),
            },
            calendar: {
              offsets: [-1, 1],
            },
          }}
        >
          <DatePickerBody />
        </DatePickerProvider>
      </DatePicker.Content>
    </DatePicker>
  );
}

RangePicker.fileName = 'RangePicker';
