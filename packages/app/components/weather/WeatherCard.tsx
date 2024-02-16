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
import { loadStyles } from './weatherCard.style';
import { useWeatherInfo } from './useWeatherInfo';

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

  const precipitationInfo = useWeatherInfo(
    'cloud-rain',
    currentTheme.colors.weatherIcon,
    'PRECIPITATION',
    '0%',
  );
  const humidityInfo = useWeatherInfo(
    'droplet',
    currentTheme.colors.weatherIcon,
    'HUMIDITY',
    `${weatherObject.main.humidity}%`,
  );
  const windInfo = useWeatherInfo(
    'wind',
    currentTheme.colors.weatherIcon,
    'WIND',
    convertToKmh(weatherObject.wind.speed),
  );

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
          {precipitationInfo}
          {humidityInfo}
          {windInfo}
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
        backgroundColor={'#eaeaea'}
        style={styles.card}
      >
        {restOfWeek.map((day, index) => (
          <RStack key={index} style={styles.weatherInfo}>
            <RText>{formatDay(day)}</RText>
            <RText>{convertToCelsius(weatherWeek[index].main.temp)}</RText>
          </RStack>
        ))}
      </RStack>
    </RStack>
  );
}

const formatDay = (day) => {
  return dayNumToString(day)?.slice?.(0, 3) || '';
};
