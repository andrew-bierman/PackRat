import { useTranslation } from 'expo-app/lib/hooks/useTranslation';
import { Stack, useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OFFICIAL_ROW_ICON_SIZE, OfficialTemplateRow } from '../components/OfficialTemplateRow';
import { usePackTemplates } from '../hooks';
import { usePackTemplateSummaries } from '../hooks/usePackTemplateSummary';

/** Every official template, opened from the shelf header. */
export function OfficialTemplatesScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const templates = usePackTemplates();
  const official = useMemo(() => templates.filter((tpl) => tpl.isAppTemplate), [templates]);
  const summaries = usePackTemplateSummaries({ templateIds: official.map((tpl) => tpl.id) });

  const openTemplate = useCallback(
    (id: string) => router.push({ pathname: '/pack-templates/[id]', params: { id } }),
    [router],
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <Stack.Screen options={{ title: t('packTemplates.official') }} />
      <FlatList
        data={official}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        renderItem={({ item }) => (
          <OfficialTemplateRow
            template={item}
            summary={summaries[item.id]}
            onPress={openTemplate}
          />
        )}
        ItemSeparatorComponent={() => (
          <View className="h-px bg-border" style={{ marginLeft: OFFICIAL_ROW_ICON_SIZE + 12 }} />
        )}
      />
    </SafeAreaView>
  );
}
