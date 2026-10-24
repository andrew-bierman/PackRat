import { use$ } from '@legendapp/state/react';
import type { TripGoal, TripStatsEntry } from '@packrat/schemas/tripStats';
import { useDetailedPacks } from 'expo-app/features/packs/hooks/useDetailedPacks';
import { useTrips } from 'expo-app/features/trips/hooks';
import { useMemo } from 'react';
import { getNationalParks } from '../lib/nationalParks';
import { getPlaceAtlas, localizedCountryName, placesCache } from '../lib/places';
import { tripStatsEntriesStore } from '../store/entries';
import { tripGoalsStore } from '../store/goals';
import { computeGoalProgress, type GoalProgress, sortGoals } from '../utils/goalProgress';
import { computeIdleGear, type IdleGear } from '../utils/idleGear';
import { computeParksAndPeaks, type ParksAndPeaks } from '../utils/parksAndPeaks';
import { computeTripPlaces, type TripPlaces } from '../utils/tripPlaces';
import { ALL_SCOPE, computeTripStats, type Scope, type TripStatsRecord } from '../utils/tripStats';

export function useTripGoals(): TripGoal[] {
  return use$(() => sortGoals(Object.values(tripGoalsStore.get()).filter((goal) => !goal.deleted)));
}

export function useTripStatsEntries(): TripStatsEntry[] {
  return use$(() => Object.values(tripStatsEntriesStore.get()).filter((entry) => !entry.deleted));
}

/** The record for the stats screen's cards and the entry points' visibility. */
export function useTripStatsRecord(scope: Scope = ALL_SCOPE): TripStatsRecord {
  const trips = useTrips();
  const packs = useDetailedPacks();
  return useMemo(() => computeTripStats({ trips, packs, scope }), [trips, packs, scope]);
}

/** Parks and summits across every finished trip; lifetime collections ignore the scope. */
export function useParksAndPeaks(record: TripStatsRecord): ParksAndPeaks {
  const entries = useTripStatsEntries();
  return useMemo(
    () =>
      computeParksAndPeaks({
        finished: record.allFinished,
        entries,
        parks: getNationalParks(),
      }),
    [record.allFinished, entries],
  );
}

export function useGoalProgress({
  record,
  parksAndPeaks,
}: {
  record: TripStatsRecord;
  parksAndPeaks: ParksAndPeaks;
}): GoalProgress[] {
  const goals = useTripGoals();
  return useMemo(
    () =>
      goals.flatMap(
        (goal) => computeGoalProgress({ goal, finished: record.allFinished, parksAndPeaks }) ?? [],
      ),
    [goals, record.allFinished, parksAndPeaks],
  );
}

/**
 * Countries and regions for the trips inside the record's scope, with first visits read from the
 * whole record.
 */
export function useTripPlaces(record: TripStatsRecord): TripPlaces {
  return useMemo(() => {
    const atlas = getPlaceAtlas();
    return computeTripPlaces({
      finished: record.finished,
      lifetime: record.allFinished,
      atlas,
      countryName: (code) =>
        localizedCountryName(code) ?? atlas.countriesByCode.get(code)?.name ?? code,
      cache: placesCache,
    });
  }, [record.finished, record.allFinished]);
}

/** Gear in the user's packs that no finished trip carried in the last twelve months. */
export function useIdleGear(record: TripStatsRecord): IdleGear {
  const packs = useDetailedPacks();
  return useMemo(
    () => computeIdleGear({ finished: record.allFinished, packs }),
    [record.allFinished, packs],
  );
}
