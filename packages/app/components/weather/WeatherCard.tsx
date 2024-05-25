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
import { RImage, RStack, RText } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useDate } from 'app/hooks/weather/useDate';
import { defaultWeatherObject } from '../../constants/defaultWeatherObj';
import { defaultWeekObj } from '../../constants/defaultWeekObj';
import { background } from 'native-base/lib/typescript/theme/styled-system';

interface WeatherObject {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: any;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

interface WeatherDay {
  weather: {
    icon: string;
  }[];
  main: {
    temp: number;
  };
}

interface WeatherCardProps {
  weatherObject?: WeatherObject;
  weatherWeek?: WeatherDay[];
}

export default function WeatherCard({
  weatherObject = defaultWeatherObject,
  weatherWeek = defaultWeekObj,
}: WeatherCardProps) {
  // Hooks
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const { dateFormatted, day, restOfWeek } = useDate();

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`;

  return (
    <RStack
      $sm={{
        borderRadius: 6,
        flexDirection: 'column',
        width: '100%',
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
            color: currentTheme.colors.textPrimary,
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
        <RText>{dateFormatted}</RText>
        <RStack
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}
        >
          <FontAwesome name="map-marker" size={16} color="black" />
          <RText>{`${weatherObject.name}, ${weatherObject.sys.country}`}</RText>
        </RStack>

        <RStack>
          <RImage
            source={{
              uri: weatherIconUrl,
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
            {convertToCelsius(weatherObject.main.temp)}
          </RText>
          <RText style={{ fontWeight: 700 }}>
            {weatherObject.weather[0].description}
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
            <RText>0%</RText>
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
            <RText>{weatherObject.main.humidity}%</RText>
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
            <RText>{convertToKmh(weatherObject.wind.speed)}</RText>
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
          {weatherWeek.map((day, i) => {
            const weatherIconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

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
                <RText>{formatDay(restOfWeek[i])}</RText>
                <RText style={{ fontWeight: 700 }}>
                  {convertToCelsius(day.main.temp)}
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
        {restOfWeek.map((day, index) => {
          return (
            <RStack key={index} style={styles.weatherInfo}>
              <RText style={{ color: styles.tempColor.color }}>{day}</RText>
              <RText style={{ color: styles.tempColor.color }}>
                {convertToCelsius(weatherWeek[index].main.temp)}
              </RText>
            </RStack>
          );
        })}
      </RStack>
    </RStack>
  );
}

const formatDay = (day) => {
  return dayNumToString(day)?.slice?.(0, 3) || '';
};

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
          : currentTheme.colors.textDarkGrey,
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
