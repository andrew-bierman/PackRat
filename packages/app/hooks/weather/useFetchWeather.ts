import { useMemo } from 'react';
import { queryTrpc } from '../../trpc';
import { isToday, getDay } from 'date-fns';
import { getCurrentUTCDate, getUTCDateFromStr } from 'app/utils/dates';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
interface WeatherToday {
  date: string;
  temp: number;
  icon: string;
  description: string;
  precipitation: number;
  humidity: number;
  wind: number;
}

interface WeatherWeekData {
  day: (typeof weekdays)[number];
  avgTemp: number;
}

type WeatherWeek = Record<(typeof weekdays)[number], number>;

export interface WeatherResult {
  weatherToday: WeatherToday[];
  weatherWeek: WeatherWeekData[];
}

export const useFetchWeather = (latLng, isDisabled = false) => {
  const { lat, lon } = latLng || {};
  const isEnabled = !isDisabled && Boolean(lat && lon);
  const { refetch, data, error, isLoading, isError } =
    queryTrpc.getWeather.useQuery(
      { lat, lon },
      {
        enabled: isEnabled,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    );

  const { weatherToday, weatherWeek } = useMemo<WeatherResult>(() => {
    if (!Array.isArray(data?.list)) {
      return { weatherToday: null, weatherWeek: null };
    }

    const result = data.list.reduce(
      (result, current, index, arr) => {
        const date = getUTCDateFromStr(current.dt_txt);

        const currentTemp = current?.main?.temp ?? 0;

        if (isToday(date)) {
          result.weatherToday.push({
            date: current.dt_txt,
            icon: current?.weather?.[0]?.icon,
            description: current?.weather?.[0]?.description,
            temp: currentTemp,
            humidity: current?.main?.humidity,
            wind: current?.wind?.speed,
            precipitation: current?.rain?.['3h'],
          });

          return result;
        }

        const weekDay = getDay(date);

        if (!result.currentWeekDay) {
          result.currentWeekDay = weekDay;
          result.weatherWeek[weekDay] = { temp: currentTemp, count: 1 };

          return result;
        }

        const currentWeekDayResult = result.weatherWeek[result.currentWeekDay];

        if (result.currentWeekDay === weekDay) {
          result.weatherWeek[weekDay].temp += currentTemp;
          result.weatherWeek[weekDay].count++;
          if (index === arr.length - 1) {
            result.weatherWeek[result.currentWeekDay] = Math.ceil(
              currentWeekDayResult.temp / currentWeekDayResult.count,
            );
          }
          return result;
        }

        result.weatherWeek[result.currentWeekDay] = Math.ceil(
          currentWeekDayResult.temp / currentWeekDayResult.count,
        );
        result.currentWeekDay = weekDay;
        result.weatherWeek[weekDay] = { temp: currentTemp, count: 1 };

        return result;
      },
      { weatherToday: [], weatherWeek: {}, currentWeekDay: null },
    );

    const weekDayListData: WeatherWeekData[] = [];

    const nextWeekDay = getDay(getCurrentUTCDate()) + 1;
    for (let i = nextWeekDay; i < weekdays.length; i++) {
      if (result.weatherWeek[i] === undefined) {
        break;
      }
      weekDayListData.push({
        day: weekdays[i] as (typeof weekdays)[number],
        avgTemp: result.weatherWeek[i],
      });
    }

    result.weatherWeek = weekDayListData;

    return result;
  }, [data?.list]);
  return {
    refetch,
    weatherToday,
    weatherWeek,
    location: data?.city || {},
    error,
    isLoading,
    isError,
  };
};
