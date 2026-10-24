import { use$ } from '@legendapp/state/react';
import type { TripGoal, TripGoalMetric } from '@packrat/schemas/tripStats';
import { Alert, type AlertMethods } from '@packrat/ui/src/alert';
import { Button } from '@packrat/ui/src/button';
import { Text } from '@packrat/ui/src/text';
import { addMonths, addYears, startOfDay } from 'date-fns';
import { useColorScheme } from 'expo-app/lib/hooks/useColorScheme';
import { useTranslation } from 'expo-app/lib/hooks/useTranslation';
import { obs } from 'expo-app/lib/store';
import { testIds } from 'expo-app/lib/testIds';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { nanoid } from 'nanoid';
import { useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateField, FullScreenDialogHeader, OutlinedField } from '../components/DialogParts';
import { MenuField } from '../components/MenuField';
import { SegmentedButtons } from '../components/StatsParts';
import { useParksAndPeaks, useTripStatsRecord } from '../hooks/useTripStats';
import { useStatsFormat } from '../lib/useStatsFormat';
import { tripGoalsStore } from '../store/goals';
import { isMeasuredMetric } from '../utils/goalProgress';
import { parksVisitedBetween, peaksSummitedBetween } from '../utils/parksAndPeaks';
import { clipTrips, computeTotals, dayFromString, dayToString } from '../utils/tripStats';
import {
  distanceSymbol,
  distanceValue,
  elevationSymbol,
  elevationValue,
  metresFromDistance,
  metresFromElevation,
} from '../utils/units';

type DatedKind = 'annual' | 'custom';
const KINDS = Object.freeze(['annual', 'custom'] as const);
const METRICS = Object.freeze([
  'nights',
  'trips',
  'days',
  'distance',
  'elevation',
  'summits',
  'parks',
] as const satisfies readonly TripGoalMetric[]);

/**
 * New and edit goal, as a Material 3 full-screen dialog. A goal covers this calendar year or
 * custom dates, and measures nights, trips, days, distance, climbing, summits or parks.
 */
export function GoalEditorScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { colors } = useColorScheme();
  const { goalId } = useLocalSearchParams<{ goalId?: string }>();
  const existing = use$(() => (goalId ? tripGoalsStore.get()[goalId] : undefined));
  const { unit, formatMetric } = useStatsFormat();
  const record = useTripStatsRecord();
  const parksAndPeaks = useParksAndPeaks(record);

  const today = startOfDay(new Date());
  const [kind, setKind] = useState<DatedKind>(existing?.kind === 'custom' ? 'custom' : 'annual');
  const [metric, setMetric] = useState<TripGoalMetric>(existing?.metric ?? 'nights');
  const [name, setName] = useState(existing?.name ?? '');
  const [startDate, setStartDate] = useState(dayFromString(existing?.startDate) ?? today);
  const [endDate, setEndDate] = useState(dayFromString(existing?.endDate) ?? addMonths(today, 3));
  const [targetText, setTargetText] = useState(() => {
    if (!existing) return '';
    const shown =
      existing.metric === 'distance'
        ? distanceValue({ metres: existing.target, unit })
        : existing.metric === 'elevation'
          ? elevationValue({ metres: existing.target, unit })
          : existing.target;
    return String(Math.round(shown * 10) / 10);
  });
  const year = existing?.year ?? today.getFullYear();
  const alertRef = useRef<AlertMethods>(null);

  /** In the metric's base unit, or null while the field can't be saved. */
  const target = useMemo(() => {
    const value = Number(targetText.trim().replace(',', '.'));
    if (!Number.isFinite(value) || value <= 0) return null;
    if (metric === 'distance') return metresFromDistance({ value, unit });
    if (metric === 'elevation') return metresFromElevation({ value, unit });
    return Math.round(value) >= 1 ? Math.round(value) : null;
  }, [targetText, metric, unit]);

  /** The same stretch last year, so the target starts from something real. */
  const hint = useMemo(() => {
    const window =
      kind === 'annual'
        ? { start: new Date(year - 1, 0, 1), end: new Date(year - 1, 11, 31) }
        : { start: addYears(startDate, -1), end: addYears(endDate, -1) };
    const totals = computeTotals(clipTrips({ trips: record.allFinished, window }));
    const byMetric: Record<TripGoalMetric, number | null> = {
      trips: totals.trips,
      nights: totals.nights,
      days: totals.days,
      distance: totals.distance,
      elevation: totals.elevationGain,
      summits: peaksSummitedBetween({ record: parksAndPeaks, window }),
      parks: parksVisitedBetween({ record: parksAndPeaks, window }),
    };
    const value = byMetric[metric];
    // Hand-added summits and parks count without a trip; everything else needs one.
    const handAdded = (metric === 'summits' || metric === 'parks') && (value ?? 0) > 0;
    if (value == null || (totals.trips === 0 && !handAdded)) return null;
    return kind === 'annual'
      ? t('tripStats.goals.hintLastYear', { year: year - 1, value: formatMetric(metric, value) })
      : t('tripStats.goals.hintSameDates', { value: formatMetric(metric, value) });
  }, [kind, year, startDate, endDate, metric, record.allFinished, parksAndPeaks, formatMetric, t]);

  const targetUnit =
    metric === 'distance'
      ? distanceSymbol(unit)
      : metric === 'elevation'
        ? elevationSymbol(unit)
        : t(`tripStats.goals.units.${metric}`);

  const save = () => {
    if (target == null) return;
    const now = new Date().toISOString();
    const trimmed = name.trim();
    const goal: TripGoal = {
      id: existing?.id ?? nanoid(),
      kind,
      metric,
      target,
      year: kind === 'annual' ? year : null,
      name: kind === 'custom' && trimmed ? trimmed : null,
      startDate: kind === 'custom' ? dayToString(startDate) : null,
      endDate: kind === 'custom' ? dayToString(endDate < startDate ? startDate : endDate) : null,
      trailCode: null,
      peaks: null,
      parkCodes: null,
      deleted: false,
      localCreatedAt: existing?.localCreatedAt ?? now,
      localUpdatedAt: now,
    };
    obs({ store: tripGoalsStore, id: goal.id }).set(goal);
    router.back();
  };

  const confirmDelete = () => {
    if (!existing) return;
    // Material 3 AlertDialog (Compose), not the legacy platform dialog `Alert.alert` draws.
    alertRef.current?.alert({
      title: t('tripStats.goals.deleteTitle'),
      message: t('tripStats.goals.deleteBody'),
      buttons: [
        { text: t('tripStats.dialog.cancel'), style: 'cancel' },
        {
          text: t('tripStats.dialog.delete'),
          style: 'destructive',
          onPress: () => {
            obs({ store: tripGoalsStore, id: existing.id }).assign({
              deleted: true,
              localUpdatedAt: new Date().toISOString(),
            });
            router.back();
          },
        },
      ],
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <FullScreenDialogHeader
              title={existing ? t('tripStats.goals.editGoal') : t('tripStats.goals.newGoal')}
              onClose={() => router.back()}
              onSave={save}
              canSave={target != null}
            />
          ),
        }}
      />
      <KeyboardAvoidingView behavior="height" className="flex-1">
        <ScrollView contentContainerClassName="gap-2 py-4" keyboardShouldPersistTaps="handled">
          <View className="px-4 pb-2">
            <SegmentedButtons
              options={KINDS}
              value={kind}
              onChange={setKind}
              label={(value) => t(`tripStats.goals.kinds.${value}`)}
              testIDFor={testIds.tripStats.goalKind}
            />
          </View>
          {kind === 'custom' ? (
            <>
              <OutlinedField
                label={t('tripStats.goals.name')}
                placeholder={t('tripStats.goals.namePlaceholder')}
                value={name}
                onChangeText={setName}
                maxLength={120}
                testID={testIds.tripStats.goalNameInput}
              />
              <DateField
                label={t('tripStats.goals.starts')}
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  if (endDate < date) setEndDate(date);
                }}
                testID={testIds.tripStats.goalStartDate}
              />
              <DateField
                label={t('tripStats.goals.ends')}
                value={endDate}
                minimumDate={startDate}
                onChange={setEndDate}
                testID={testIds.tripStats.goalEndDate}
              />
            </>
          ) : null}
          <MenuField
            label={t('tripStats.goals.measure')}
            options={METRICS}
            value={metric}
            onChange={setMetric}
            optionLabel={(value) => t(`tripStats.goals.metrics.${value}`)}
            testIDFor={testIds.tripStats.goalMetric}
          />
          <OutlinedField
            label={`${t('tripStats.goals.target')} (${targetUnit})`}
            value={targetText}
            onChangeText={setTargetText}
            keyboardType={isMeasuredMetric(metric) ? 'decimal-pad' : 'number-pad'}
            placeholder="0"
            testID={testIds.tripStats.goalTargetInput}
          />
          {hint ? (
            <Text variant="footnote" className="px-8 text-muted-foreground">
              {hint}
            </Text>
          ) : null}
          {existing ? (
            <Button
              variant="plain"
              className="mx-2 mt-4 self-start"
              onPress={confirmDelete}
              testID={testIds.tripStats.deleteGoalBtn}
            >
              <Text style={{ color: colors.destructive }}>{t('tripStats.goals.deleteGoal')}</Text>
            </Button>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
      <Alert title="" buttons={[]} ref={alertRef} />
    </SafeAreaView>
  );
}
