import { use$ } from '@legendapp/state/react';
import { Text } from '@packrat/ui/src/text';
import { Icon } from 'expo-app/components/Icon';
import { usePacks } from 'expo-app/features/packs/hooks/usePacks';
import { packItemsStore } from 'expo-app/features/packs/store';
import type { PackInStore } from 'expo-app/features/packs/types';
import { useColorScheme } from 'expo-app/lib/hooks/useColorScheme';
import { useTranslation } from 'expo-app/lib/hooks/useTranslation';
import { testIds } from 'expo-app/lib/testIds';
import { NotFoundScreen } from 'expo-app/screens/NotFoundScreen';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { applyTemplateErrorAtom } from '../atoms/applyTemplateAtoms';
import { useApplyPackTemplate, usePackTemplateDetails } from '../hooks';
import { useBlockBackWhile } from '../hooks/useBlockBackWhile';

function usePackItemCounts(): Record<string, number> {
  return use$(() => {
    const counts: Record<string, number> = {};
    for (const item of Object.values(packItemsStore.get())) {
      if (item.deleted) continue;
      counts[item.packId] = (counts[item.packId] ?? 0) + 1;
    }
    return counts;
  });
}

/** Apply to Pack: New Pack first, then the user's packs. */
export function ApplyTemplateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useColorScheme();
  const template = usePackTemplateDetails(id);
  const packs = usePacks();
  const itemCounts = usePackItemCounts();
  const { applyToPack } = useApplyPackTemplate();
  const [applyingPackId, setApplyingPackId] = useState<string | null>(null);
  const [error, setError] = useAtom(applyTemplateErrorAtom);
  const isWorking = applyingPackId !== null;
  useBlockBackWhile(isWorking);

  // A stale error from an earlier visit shouldn't greet the next one.
  useEffect(() => () => setError(null), [setError]);

  if (!template) {
    return (
      <NotFoundScreen
        title={t('packTemplates.templateNotFound')}
        message={t('packTemplates.pleaseTryAgainLater')}
      />
    );
  }

  const templateItemCount = template.items?.length ?? 0;
  const countLabel = (n: number) =>
    `${n} ${n === 1 ? t('packTemplates.item') : t('packTemplates.items')}`;

  const apply = async (pack: PackInStore) => {
    setError(null);
    setApplyingPackId(pack.id);
    try {
      await applyToPack({ template, pack });
      router.dismissTo({ pathname: '/pack-templates/[id]', params: { id: template.id } });
      router.push({ pathname: '/pack/[id]', params: { id: pack.id } });
    } catch {
      setError(t('packTemplates.applyFailed'));
    } finally {
      setApplyingPackId(null);
    }
  };

  const header = (
    <View>
      {error && (
        <View
          className="mx-4 mt-4 flex-row items-center gap-3 rounded-xl bg-destructive/10 p-3"
          testID={testIds.packTemplates.applyError}
        >
          <Icon name="alert-circle-outline" size={20} color={colors.destructive} />
          <Text className="flex-1 text-sm text-foreground">{error}</Text>
        </View>
      )}
      <Pressable
        disabled={isWorking}
        onPress={() =>
          router.push({ pathname: '/pack-templates/[id]/new-pack', params: { id: template.id } })
        }
        android_ripple={{}}
        className="mt-2 flex-row items-center gap-4 px-4 py-4"
        style={{ opacity: isWorking ? 0.4 : 1 }}
        testID={testIds.packTemplates.applyNewPack}
      >
        <Icon name="plus" size={24} color={colors.primary} />
        <Text className="text-base font-medium text-primary">{t('packTemplates.newPack')}</Text>
      </Pressable>
      <Text className="px-4 pb-2 text-sm text-muted-foreground">
        {t('packTemplates.applyAddsItems', {
          count: countLabel(templateItemCount),
          name: template.name,
        })}
      </Text>
      {packs.length > 0 && (
        <Text className="px-4 pb-1 pt-5 text-sm font-medium text-primary">
          {t('packTemplates.yourPacks')}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <Stack.Screen
        options={{
          title: t('packTemplates.applyToPack'),
          gestureEnabled: !isWorking,
          headerBackVisible: !isWorking,
        }}
      />
      <FlatList
        data={packs}
        keyExtractor={(pack) => pack.id}
        ListHeaderComponent={header}
        renderItem={({ item: pack }) => {
          const isApplying = applyingPackId === pack.id;
          return (
            <Pressable
              disabled={isWorking}
              onPress={() => apply(pack)}
              android_ripple={{}}
              className="flex-row items-center px-4 py-3"
              style={{ opacity: isWorking && !isApplying ? 0.4 : 1 }}
              testID={testIds.packTemplates.applyPackRow(pack.id)}
            >
              <View className="flex-1">
                <Text className="text-base text-foreground">{pack.name}</Text>
                <Text className="text-sm text-muted-foreground">
                  {isApplying
                    ? t('packTemplates.addingItems', { count: countLabel(templateItemCount) })
                    : countLabel(itemCounts[pack.id] ?? 0)}
                </Text>
              </View>
              {isApplying && <ActivityIndicator color={colors.primary} />}
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
