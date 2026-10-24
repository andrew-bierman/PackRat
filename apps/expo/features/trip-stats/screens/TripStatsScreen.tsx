import { use$ } from '@legendapp/state/react';
import { getAppBarOptions } from '@packrat/ui/src/app-bar';
import { Button } from '@packrat/ui/src/button';
import { Text } from '@packrat/ui/src/text';
import { Icon } from 'expo-app/components/Icon';
import { useColorScheme } from 'expo-app/lib/hooks/useColorScheme';
import { useTranslation } from 'expo-app/lib/hooks/useTranslation';
import { testIds } from 'expo-app/lib/testIds';
import { Stack, useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CollectionCards } from '../components/CollectionCards';
import { ComebackCard, GoalsCard } from '../components/GoalCards';
import {
  ActivitiesCard,
  BaseWeightCard,
  HighlightsCard,
  MonthsCard,
  ThisYearCard,
  TopGearCard,
  TotalsCard,
} from '../components/RecordCards';
import { useDistanceUnit } from '../hooks/useDistanceUnit';
import { useGoalProgress, useParksAndPeaks, useTripStatsRecord } from '../hooks/useTripStats';
import { tripStatsSettingsStore } from '../store/settings';

export function TripStatsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { colors } = useColorScheme();
  const unit = useDistanceUnit();
  const record = useTripStatsRecord();
  const parksAndPeaks = useParksAndPeaks(record);
  const goals = useGoalProgress({ record, parksAndPeaks });
  const settings = use$(tripStatsSettingsStore);

  const addGoal = () => router.push('/trip-stats/goal');
  const comeback = record.comeback;
  // A reason belongs to the comeback it was given for, not to the next one.
  const reason =
    comeback && settings.breakReasonTripId === comeback.trip.trip.id
      ? (settings.breakReason ?? null)
      : null;

  return (
    <SafeAreaView className="flex-1" edges={['bottom']} testID={testIds.tripStats.screen}>
      <Stack.Screen
        options={{
          ...getAppBarOptions(),
          title: t('tripStats.title'),
          headerRight: record.hasTrips
            ? () => (
                <Pressable
                  onPress={addGoal}
                  hitSlop={8}
                  className="p-3"
                  accessibilityRole="button"
                  accessibilityLabel={t('tripStats.addGoal')}
                  android_ripple={{ borderless: true, color: colors.grey5 }}
                >
                  <Icon name="flag-plus-outline" size={24} color={colors.foreground} />
                </Pressable>
              )
            : undefined,
        }}
      />
      {record.hasTrips ? (
        <ScrollView
          contentContainerClassName="gap-4 p-4"
          contentInsetAdjustmentBehavior="automatic"
        >
          <TotalsCard title={t('tripStats.totals.allTime')} totals={record.totals} unit={unit} />
          {comeback ? (
            <ComebackCard
              comeback={comeback}
              reason={reason}
              unit={unit}
              onReasonChange={(next) =>
                tripStatsSettingsStore.set({
                  ...tripStatsSettingsStore.peek(),
                  breakReason: next,
                  breakReasonTripId: next ? comeback.trip.trip.id : null,
                })
              }
            />
          ) : null}
          <GoalsCard
            progress={goals}
            onAdd={addGoal}
            onEdit={(goalId) => router.push({ pathname: '/trip-stats/goal', params: { goalId } })}
          />
          <ThisYearCard record={record} />
          <MonthsCard record={record} />
          <ActivitiesCard record={record} unit={unit} />
          <HighlightsCard record={record} unit={unit} />
          <CollectionCards record={record} parksAndPeaks={parksAndPeaks} unit={unit} />
          <TopGearCard record={record} />
          <BaseWeightCard record={record} />
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center gap-3 px-8">
          <Icon name="chart-box-outline" size={48} color={colors.grey} />
          <Text variant="title3" className="text-center font-medium">
            {t('tripStats.emptyTitle')}
          </Text>
          <Text variant="body" className="text-center text-muted-foreground">
            {t('tripStats.emptyBody')}
          </Text>
          <Button
            className="mt-2"
            onPress={() => router.push('/trip/new')}
            testID={testIds.tripStats.emptyPlanTripBtn}
          >
            <Text>{t('tripStats.planTrip')}</Text>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}
