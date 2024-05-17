import {
  DatePickerProvider as _DatePickerProvider,
  useDatePickerContext,
} from '@rehookify/datepicker'
import type { DPDay } from '@rehookify/datepicker'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, Button, H3, Separator, View } from 'tamagui'
import { DatePicker } from './common/dateParts'
import {
  DatePickerInput,
  HeaderTypeProvider,
  MonthPicker,
  SizableText,
  YearPicker,
  YearRangeSlider,
  swapOnClick,
  useHeaderType,
} from './common/dateParts'
import { Platform } from 'react-native'
import { useDateAnimation } from './DatePicker'

function Calendar({
  calenderIndex = 0,
  order,
}: {
  calenderIndex?: number
  order?: 'first' | 'last'
}) {
  const { setHeader } = useHeaderType()
  const {
    data: { calendars, weekDays },
    propGetters: { dayButton, subtractOffset },
  } = useDatePickerContext()

  const { days, year, month } = calendars[calenderIndex]

  // divide days array into sub arrays that each has 7 days, for better stylings
  const subDays = useMemo(
    () =>
      days.reduce((acc, day, i) => {
        if (i % 7 === 0) {
          acc.push([])
        }
        acc[acc.length - 1].push(day)
        return acc
      }, [] as DPDay[][]),
    [days]
  )

  const { prevNextAnimation, prevNextAnimationKey } = useDateAnimation({
    listenTo: 'month',
  })

  return (
    <View flexDirection="column" gap="$2">
      <View
        flexDirection="row"
        minWidth="100%"
        height={50}
        alignItems="center"
        justifyContent="space-between"
      >
        {order === 'first' ? (
          <Button circular size="$4" {...swapOnClick(subtractOffset({ months: 1 }))}>
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
              <Button circular size="$4" {...swapOnClick(subtractOffset({ months: -1 }))}>
                <Button.Icon scaleIcon={1.5}>
                  <ChevronRight />
                </Button.Icon>
              </Button>
            ) : (
              <View />
            ),
          native: (
            <Button circular size="$4" {...swapOnClick(subtractOffset({ months: -1 }))}>
              <Button.Icon scaleIcon={1.5}>
                <ChevronRight />
              </Button.Icon>
            </Button>
          ),
        })}
      </View>

      <AnimatePresence key={prevNextAnimationKey}>
        <View animation="medium" {...prevNextAnimation()} gap="$3">
          <View flexDirection="row" gap="$1">
            {weekDays.map((day) => (
              <SizableText theme="alt1" key={day} ta="center" width={45} size="$4">
                {day}
              </SizableText>
            ))}
          </View>
          <View flexDirection="column" gap="$1" flexWrap="wrap">
            {subDays.map((days) => {
              return (
                <View flexDirection="row" key={days[0].$date.toString()} gap="$1">
                  {days.map((d) => (
                    <Button
                      key={d.$date.toString()}
                      chromeless
                      circular
                      padding={0}
                      width={45}
                      {...swapOnClick(dayButton(d))}
                      backgroundColor={
                        !d.inCurrentMonth
                          ? 'transparent'
                          : d.selected
                            ? '$background'
                            : 'transparent'
                      }
                      themeInverse={d.selected}
                      disabled={!d.inCurrentMonth}
                    >
                      <Button.Text
                        color={
                          !d.inCurrentMonth
                            ? '$gray6'
                            : d.selected
                              ? '$gray12'
                              : '$gray11'
                        }
                      >
                        {d.day}
                      </Button.Text>
                    </Button>
                  ))}
                </View>
              )
            })}
          </View>
        </View>
      </AnimatePresence>
    </View>
  )
}

function DatePickerBody() {
  const [header, setHeader] = useState<'year' | 'month' | 'day'>('day')
  const {
    data: { calendars, years },
    propGetters: { subtractOffset, previousYearsButton, nextYearsButton },
  } = useDatePickerContext()

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
          <View alignItems="center" gap="$3">
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
                setHeader('day')
              }}
            />
          </View>
        )}
      </View>
    </HeaderTypeProvider>
  )
}

/** ------ EXAMPLE ------ */
export function MultiSelectPicker() {
  const now = new Date()
  const [selectedDates, onDatesChange] = useState<Date[]>([])
  const [offsetDate, onOffsetChange] = useState<Date>(now)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (selectedDates.length === 2) {
      setOpen(false)
    }
  }, [selectedDates])

  // uncomment this to limit the range of dates
  //   const M = now.getMonth()
  //   const Y = now.getFullYear()
  //   const D = now.getDate()

  return (
    <DatePicker
      open={open}
      onOpenChange={setOpen}
      config={{
        selectedDates,
        onDatesChange,
        offsetDate,
        onOffsetChange,
        dates: {
          mode: 'multiple',
          limit: 2,
          // limit years to 2 years before and after current year
          //   minDate: new Date(Y, M - 2, 1),
          //   maxDate: new Date(Y, M + 2, 0),
          toggle: true,
        },
        calendar: {
          offsets: [-1, 1],
        },
      }}
    >
      <DatePicker.Trigger asChild>
        <DatePickerInput
          width={250}
          placeholder="Start date, End date"
          value={`${selectedDates[0]?.toDateString() || ''}${
            selectedDates[0] && selectedDates[1]
              ? ' , '
              : selectedDates[0]
                ? ' , end date'
                : ''
          }${selectedDates[1]?.toDateString() || ''}`}
          onReset={() => onDatesChange([])}
          onButtonPress={() => setOpen(true)}
        />
      </DatePicker.Trigger>

      <DatePicker.Content>
        <DatePicker.Content.Arrow />
        <DatePickerBody />
      </DatePicker.Content>
    </DatePicker>
  )
}

MultiSelectPicker.fileName = 'MultiSelectPicker'
