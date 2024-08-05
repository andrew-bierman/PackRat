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
import { RImage, RStack as OriginalRStack, RText } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useDate } from 'app/hooks/weather/useDate';
import { WeatherResult } from 'hooks/weather';
import { getCurrentUTCDate, getUTCDateFromStr } from 'app/utils/dates';
import { format, isAfter, isEqual } from 'date-fns';

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
    <RStack
      $sm={{
        borderRadius: 6,
        flexDirection: 'column',
        width: '90%',
      }}
      $gtSm={{
        borderRadius: 12,
        flexDirection: 'row',
        width: '90%',
      }}
      flexDirection="row"
      flexWrap="wrap"
      style={styles.desktopContainer}
    >
      <RStack
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
          alignSelf: 'center',
        }}
        flexDirection="row"
        flexWrap="wrap"
        flex={0.5}
      >
        <Octicons
          name="broadcast"
          size={18}
          color={currentTheme.colors.cardIconColor}
        />
        <RText
          style={{
            color: currentTheme.colors.text,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Weather
        </RText>
      </RStack>
      <RStack
        $sm={{
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'space-between',
        }}
        $gtSm={{
          paddingRight: 0,
        }}
        flex={0.5}
        style={styles.card}
      >
        <RText
          style={{
            color: currentTheme.colors.weatherIcon,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {dayNumToString(day)}
        </RText>
        <RText>{dateFormatted} ( UTC )</RText>
        <RStack
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}
        >
          <FontAwesome name="map-marker" size={16} color="black" />
          {location ? (
            <RText>{`${location?.name}, ${location?.country}`}</RText>
          ) : null}
        </RStack>

        <RStack>
          <RImage
            source={{
              uri: getWeatherIconURI(currentWeather.icon),
              width: 62,
              height: 62,
            }}
            alt="weatherIcon"
          />
        </RStack>

        <RStack>
          <RText
            style={{
              color: currentTheme.colors.weatherIcon,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {convertToCelsius(currentWeather.temp)}
          </RText>
          <RText style={{ fontWeight: 700 }}>
            {currentWeather.description}
          </RText>
        </RStack>
      </RStack>

      <RStack
        flex={1}
        style={{ gap: 10, padding: 0 }}
        $sm={{
          width: '100%',
        }}
      >
        <RStack style={styles.card}>
          <RStack style={styles.weatherInfo}>
            <RStack style={styles.iconsSection}>
              <FontAwesome5
                name="cloud-rain"
                size={18}
                color={currentTheme.colors.weatherIcon}
              />
              <RText
                style={{
                  color: currentTheme.colors.weatherIcon,
                  fontWeight: 600,
                }}
              >
                PRECIPITATION
              </RText>
            </RStack>
            <RText>
              {currentWeather.precipitation
                ? `${currentWeather.precipitation}mm`
                : 'Not available'}
            </RText>
          </RStack>
          <RStack style={styles.weatherInfo}>
            <RStack style={styles.iconsSection}>
              <Feather
                name="droplet"
                size={18}
                color={currentTheme.colors.weatherIcon}
              />
              <RText
                style={{
                  color: currentTheme.colors.weatherIcon,
                  fontWeight: 600,
                }}
              >
                HUMIDITY
              </RText>
            </RStack>
            <RText>{currentWeather.humidity}%</RText>
          </RStack>
          <RStack style={styles.weatherInfo}>
            <RStack style={styles.iconsSection}>
              <Feather
                name="wind"
                size={18}
                color={currentTheme.colors.weatherIcon}
              />
              <RText
                style={{
                  color: currentTheme.colors.weatherIcon,
                  fontWeight: 600,
                }}
              >
                WIND
              </RText>
            </RStack>
            <RText>{convertToKmh(currentWeather.wind)}</RText>
          </RStack>
        </RStack>

        <RStack
          $sm={{
            height: '100%',
            flexDirection: 'column',
          }}
          $gtSm={{
            height: '100%',
            flexDirection: 'row',
          }}
          flexDirection="row"
          flexWrap="wrap"
          flex={0.5}
          style={styles.cardContainer}
        >
          {restSegments.map((segment, i) => {
            const weatherIconUrl = getWeatherIconURI(segment.icon);

            return (
              <RStack
                key={i}
                $sm={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
                style={styles.weatherCard}
              >
                <RImage
                  source={{
                    uri: weatherIconUrl,
                    width: 52,
                    height: 52,
                  }}
                  alt="waetherIcon"
                />
                <RText>
                  {format(getUTCDateFromStr(segment.date), 'HH:mm')} ( UTC )
                </RText>
                <RText style={{ fontWeight: 700 }}>
                  {convertToCelsius(segment.temp)}
                </RText>
              </RStack>
            );
          })}
        </RStack>
      </RStack>

      <RStack
        $sm={{
          width: '100%',
        }}
        flex={1}
        justifyContent="space-around"
        backgroundColor={styles.tempColor.backgroundColor}
        style={styles.card}
      >
        {weatherWeek.map(({ day, avgTemp }, index) => {
          return (
            <RStack key={index} style={styles.weatherInfo}>
              <RText style={{ color: styles.tempColor.color }}>{day}</RText>
              <RText style={{ color: styles.tempColor.color }}>
                {convertToCelsius(avgTemp)}
              </RText>
            </RStack>
          );
        })}
      </RStack>
    </RStack>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    desktopContainer: {
      gap: 15,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: currentTheme.colors.card,
      padding: 30,
      alignSelf: 'center',
    },

    card: {
      gap: 10,
      borderColor: currentTheme.colors.border,
      borderWidth: 1,
      padding: 18,
      borderRadius: 8,
      shadowColor: 'black',
    },

    tempColor: {
      color: currentTheme.colors.background === '#0284c7' ? 'black' : 'white',
      backgroundColor:
        currentTheme.colors.background === '#0284c7'
          ? '#eaeaea'
          : currentTheme.colors.whiteDarkGrey,
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

    weatherInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
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
