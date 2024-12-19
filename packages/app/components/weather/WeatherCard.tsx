import React, { useMemo } from 'react';
import useTheme from '../../hooks/useTheme';
import { convertToCelsius } from '../../utils/convertToCelsius';
import { convertToKmh } from '../../utils/convertToKmh';
import { dayNumToString } from '../../utils/dayNumToString';
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Octicons,
} from '@expo/vector-icons';
import {
  RImage,
  RStack as OriginalRStack,
  RText,
  YStack,
  XStack,
} from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useDate } from 'app/hooks/weather/useDate';
import { type WeatherResult } from 'hooks/weather';
import { getCurrentUTCDate, getUTCDateFromStr } from 'app/utils/dates';
import { format, isAfter, isEqual } from 'date-fns';
import { Separator } from 'tamagui';

const RStack: any = OriginalRStack;

interface Location {
  name: string;
  country: string;
}

interface WeatherCardProps extends WeatherResult {
  location?: Location;
}

export default function WeatherCard({
  weatherToday,
  weatherWeek,
  location,
}: WeatherCardProps) {
  // Hooks
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const { dateFormatted, day } = useDate();
  const { currentWeather, restSegments } = useMemo(() => {
    return separateCurrentSegment(weatherToday);
  }, [weatherToday]);

  return (
    <YStack style={{ width: '100%', gap: 16 }}>
      <YStack style={{ gap: 8 }}>
        <RText
          style={{
            color: currentTheme.colors.text,
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          Weather Forecast
        </RText>
        <XStack style={{ justifyContent: 'space-between', gap: 8 }}>
          <XStack style={{ gap: 8 }}>
            <RImage
              source={{
                uri: getWeatherIconURI(currentWeather.icon),
                width: 36,
                height: 36,
              }}
              alt="weatherIcon"
            />
            <YStack>
              <RText
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                {convertToCelsius(currentWeather.temp)}
              </RText>
              <RText
                style={{
                  color: currentTheme.colors.textSecondary,
                }}
              >
                {currentWeather.description}
              </RText>
            </YStack>
          </XStack>
          <XStack style={{ alignItems: 'center', gap: 4 }}>
            <Feather
              name="droplet"
              size={16}
              color={currentTheme.colors.text}
            />
            <RText style={{ fontSize: 16 }}>{currentWeather.humidity}%</RText>
          </XStack>
          <XStack style={{ alignItems: 'center', gap: 4 }}>
            <Feather name="wind" size={16} color={currentTheme.colors.text} />
            <RText style={{ fontSize: 16 }}>
              {convertToKmh(currentWeather.wind)}
            </RText>
          </XStack>
        </XStack>
      </YStack>
      <Separator />
      <XStack style={{ justifyContent: 'space-between' }}>
        {weatherWeek.map(({ day, avgTemp }, index) => {
          return (
            <YStack key={index} style={styles.weatherInfo}>
              <RText
                style={{
                  color: currentTheme.colors.textSecondary,
                  fontSize: 14,
                }}
              >
                {day}
              </RText>
              <RText
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {convertToCelsius(avgTemp)}
              </RText>
            </YStack>
          );
        })}
      </XStack>
    </YStack>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    card: {
      gap: 10,
      borderColor: currentTheme.colors.border,
      borderWidth: 1,
      padding: 18,
      borderRadius: 8,
      shadowColor: 'black',
    },

    tempColor: {
      color: currentTheme.colors.text,
      backgroundColor: currentTheme.colors.card,
    },

    cardContainer: {
      alignItems: 'flex-start',
      gap: 8,
      borderColor: currentTheme.colors.border,
      borderWidth: 1,
      padding: 18,
      borderRadius: 8,
      shadowColor: 'black',
      justifyContent: 'space-between',
    },
    weatherCard: {
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    iconsSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      flex: 1,
    },
  };
};

const getWeatherIconURI = (icon: string) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

const separateCurrentSegment = (
  weatherToday: WeatherResult['weatherToday'],
) => {
  return weatherToday.reduce(
    (result, current, index, arr) => {
      const now = getCurrentUTCDate();
      const date = getUTCDateFromStr(current.date);

      if (
        (isAfter(now, date) || isEqual(date, now)) &&
        !result.currentWeather
      ) {
        result.currentWeather = current;
        return result;
      }

      if (index === arr.length - 1 && !result.currentWeather) {
        result.currentWeather = current;
        return result;
      }

      result.restSegments.push(current);

      return result;
    },
    { currentWeather: null, restSegments: [] },
  );
};
