import { Text, VStack, Box, Image, Stack, HStack } from 'native-base';

// utils
import { getNext4Days } from '../utils/getNextDays';
import { dayNumToString } from '../utils/dayNumToString';
import { convertToKmh } from '../utils/convertToKmh';
import { convertToCelsius } from '../utils/convertToCelsius';
import UseTheme from '../hooks/useTheme';
// redux
import { useSelector } from 'react-redux';

// icons
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { StyleSheet } from 'react-native';
import { theme } from '../theme';
import { defaultWeatherObject } from '../constants/defaultWeatherObj';

const monthArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function WeatherCard({
  weatherObject = defaultWeatherObject,
  weatherWeek = [],
}) {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();
  const date = new Date();
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  const day = date.getDay();

  const dateFormatted = `${monthArr[date.getMonth()]} ${dayOfMonth}, ${year}`;
  const restOfWeek = getNext4Days(day);

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`;

  return (
    <Stack
      alignSelf="center"
      w={['100%', '100%', '100%', '90%']}
      direction={['column', 'column', 'row', 'row']}
      rounded={['sm', 'sm', 'md', 'lg']}
      style={styles.desktopContainer}
    >
      <Box style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
        <Octicons
          name="broadcast"
          size={18}
          color={currentTheme.colors.cardIconColor}
        />
        <Text
          style={{
            color: currentTheme.colors.textPrimary,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Weather
        </Text>
      </Box>
      <Box
        w={['100%', '100%', '0%', '0%']}
        h={['100%', '100%', '100%', '100%']}
        flex={0.5}
        justifyContent={['space-between', 'space-between', 'none', 'none']}
        style={styles.card}
      >
        <Box>
          <Text
            style={{
              color: currentTheme.colors.weatherIcon,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {dayNumToString(day)}
          </Text>
          <Text>{dateFormatted}</Text>
          <Box style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <FontAwesome name="map-marker" size={16} color="black" />
            <Text>{`${weatherObject.name}, ${weatherObject.sys.country}`}</Text>
          </Box>
        </Box>

        <Box>
          <Image
            src={weatherIconUrl}
            style={{ width: 62, height: 62 }}
            alt="weatherIcon"
          />
        </Box>

        <Box>
          <Text
            style={{
              color: currentTheme.colors.weatherIcon,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {convertToCelsius(weatherObject.main.temp)}
          </Text>
          <Text style={{ fontWeight: 700 }}>
            {weatherObject.weather[0].description}
          </Text>
        </Box>
      </Box>

      <Box w={['100%', '100%', '100%', '100%']} flex={1} style={{ gap: 10 }}>
        <Stack
          w={['100%', '100%', '100%', '100%']}
          h={['0%', '0%', '100%', '100%']}
          flex={0.5}
          style={styles.card}
        >
          <Box style={styles.weatherInfo}>
            <Box style={styles.iconsSection}>
              <FontAwesome5
                name="cloud-rain"
                size={18}
                color={currentTheme.colors.weatherIcon}
              />
              <Text
                style={{
                  color: currentTheme.colors.weatherIcon,
                  fontWeight: 600,
                }}
              >
                PRECIPITATION
              </Text>
            </Box>
            <Text>0%</Text>
          </Box>
          <Box style={styles.weatherInfo}>
            <Box style={styles.iconsSection}>
              <Feather
                name="droplet"
                size={18}
                color={currentTheme.colors.weatherIcon}
              />
              <Text
                style={{
                  color: currentTheme.colors.weatherIcon,
                  fontWeight: 600,
                }}
              >
                HUMIDITY
              </Text>
            </Box>
            <Text>{weatherObject.main.humidity}%</Text>
          </Box>
          <Box style={styles.weatherInfo}>
            <Box style={styles.iconsSection}>
              <Feather
                name="wind"
                size={18}
                color={currentTheme.colors.weatherIcon}
              />
              <Text
                style={{
                  color: currentTheme.colors.weatherIcon,
                  fontWeight: 600,
                }}
              >
                WIND
              </Text>
            </Box>
            <Text>{convertToKmh(weatherObject.wind.speed)}</Text>
          </Box>
        </Stack>

        <Stack
          w={['100%', '100%', '100%', '100%']}
          h={['0%', '0%', '100%', '100%']}
          flex={0.5}
          direction={['column', 'column', 'row', 'row']}
          style={styles.cardContainer}
        >
          {weatherWeek.map((day, i) => {
            const weatherIconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

            return (
              <Stack
                key={i}
                direction={['row', 'row', 'column', 'column']}
                style={styles.weatherCard}
              >
                <Image
                  src={weatherIconUrl}
                  style={{ width: 52, height: 52 }}
                  alt="waetherIcon"
                />
                <Text>{dayNumToString(restOfWeek[i]).slice(0, 3)}</Text>
                <Text style={{ fontWeight: 700 }}>
                  {convertToCelsius(day.main.temp)}
                </Text>
              </Stack>
            );
          })}
        </Stack>
      </Box>

      <Stack
        w={['100%', '100%', '0%', '0%']}
        h={['0%', '0%', '100%', '100%']}
        flex={0.5}
        justifyContent="space-around"
        backgroundColor={'#eaeaea'}
        style={styles.card}
      >
        {restOfWeek.map((day, index) => (
          <Box key={index} style={styles.weatherInfo}>
            <Text>{dayNumToString(day).slice(0, 3)}</Text>
            <Text>{convertToCelsius(weatherWeek[index].main.temp)}</Text>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

const styles = StyleSheet.create({
  desktopContainer: {
    gap: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.card,
    padding: 22,
  },

  card: {
    gap: 10,
    borderColor: '#f1f5f9',
    borderWidth: 1,
    padding: 18,
    borderRadius: 8,
    shadowColor: 'black',
  },

  cardContainer: {
    alignItems: 'flex-start',
    gap: 8,
    borderColor: '#f1f5f9',
    borderWidth: 1,
    padding: 18,
    borderRadius: 8,
    shadowColor: 'black',
  },

  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  weatherCard: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    flex: 1,
    width: '100%',
  },
  iconsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});
