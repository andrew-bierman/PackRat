import { Text } from '@packrat/ui/src/text';
import { Icon } from 'expo-app/components/Icon';
import { useColorScheme } from 'expo-app/lib/hooks/useColorScheme';
import { useTranslation } from 'expo-app/lib/hooks/useTranslation';
import { testIds } from 'expo-app/lib/testIds';
import { useMemo } from 'react';
import { FlatList, Pressable, useWindowDimensions, View } from 'react-native';
import type { PackTemplateSummary } from '../hooks/usePackTemplateSummary';
import type { PackTemplateInStore } from '../types';
import { chunkIntoColumns } from '../utils/applyPackTemplate';
import { OFFICIAL_ROW_ICON_SIZE, OfficialTemplateRow } from './OfficialTemplateRow';

const ROWS_PER_COLUMN = 3;
const EDGE = 16;
const GAP = 12;
/** How much of the next column stays visible so the shelf reads as scrollable. */
const PEEK = 24;

/** Header that opens the full Official list. */
export function OfficialShelfHeader({ onPress }: { onPress: () => void }) {
  const { t } = useTranslation();
  const { colors } = useColorScheme();
  return (
    <Pressable
      onPress={onPress}
      className="px-4 pb-1 pt-4"
      accessibilityRole="button"
      testID={testIds.packTemplates.officialSeeAll}
    >
      <View className="flex-row items-center gap-1">
        <Text className="text-2xl font-bold text-foreground">{t('packTemplates.official')}</Text>
        <Icon name="chevron-right" size={24} color={colors.grey2} />
      </View>
      <Text className="text-sm text-muted-foreground">{t('packTemplates.officialSubtitle')}</Text>
    </Pressable>
  );
}

/** Columns of three official templates that page sideways. */
export function OfficialTemplatesShelf({
  templates,
  summaries,
  onTemplatePress,
}: {
  templates: PackTemplateInStore[];
  summaries: Record<string, PackTemplateSummary>;
  onTemplatePress: (templateId: string) => void;
}) {
  const { width } = useWindowDimensions();
  const columns = useMemo(
    () => chunkIntoColumns({ items: templates, size: ROWS_PER_COLUMN }),
    [templates],
  );
  // A single column takes the full width; otherwise the next one peeks in.
  const columnWidth = columns.length > 1 ? width - EDGE * 2 - PEEK - GAP : width - EDGE * 2;

  return (
    <FlatList
      horizontal
      data={columns}
      keyExtractor={(column) => column.map((t) => t.id).join('|')}
      showsHorizontalScrollIndicator={false}
      snapToInterval={columnWidth + GAP}
      decelerationRate="fast"
      contentContainerStyle={{ paddingHorizontal: EDGE, gap: GAP }}
      testID={testIds.packTemplates.officialShelf}
      renderItem={({ item: column }) => (
        <View style={{ width: columnWidth }}>
          {column.map((template, index) => (
            <View key={template.id}>
              <OfficialTemplateRow
                template={template}
                summary={summaries[template.id]}
                onPress={onTemplatePress}
              />
              {index < column.length - 1 && (
                <View
                  className="h-px bg-border"
                  style={{ marginLeft: OFFICIAL_ROW_ICON_SIZE + 12 }}
                />
              )}
            </View>
          ))}
        </View>
      )}
    />
  );
}
