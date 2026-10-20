import type { TripGoalMetric } from '@packrat/schemas/tripStats';
import { useTranslation } from 'expo-app/lib/hooks/useTranslation';
import { useCallback, useMemo } from 'react';
import { useDistanceUnit } from '../hooks/useDistanceUnit';
import { formatDistance, formatElevation } from '../utils/units';

/** Short month-and-day, e.g. "Mar 4", in the device locale. */
export function formatMonthDay(date: Date): string {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

/** Full date, e.g. "Mar 4, 2026", in the device locale. */
export function formatDay(date: Date): string {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatMonthName(month: number): string {
  return new Date(2000, month - 1, 1).toLocaleDateString(undefined, { month: 'long' });
}

/** Whole numbers with grouping, one decimal for small rates. */
export function formatNumber(value: number, fractionDigits = 0): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  });
}

/** Formats goal metrics and counts in the user's units and language. */
export function useStatsFormat() {
  const { t } = useTranslation();
  const unit = useDistanceUnit();

  const formatMetric = useCallback(
    (metric: TripGoalMetric, value: number): string => {
      const count = Math.round(value);
      switch (metric) {
        case 'distance':
          return formatDistance(value, unit);
        case 'elevation':
          return formatElevation(value, unit);
        case 'trips':
          return t('tripStats.countTrips', { count });
        case 'nights':
          return t('tripStats.countNights', { count });
        case 'days':
          return t('tripStats.countDays', { count });
        case 'summits':
          return t('tripStats.countPeaks', { count });
        case 'parks':
          return t('tripStats.countParks', { count });
      }
    },
    [t, unit],
  );

  /** The number alone, for "12 of 20 nights". */
  const formatMetricValue = useCallback(
    (metric: TripGoalMetric, value: number): string => {
      const text = formatMetric(metric, value);
      const space = text.lastIndexOf(' ');
      return space > 0 ? text.slice(0, space) : text;
    },
    [formatMetric],
  );

  return useMemo(
    () => ({ unit, formatMetric, formatMetricValue }),
    [unit, formatMetric, formatMetricValue],
  );
}
