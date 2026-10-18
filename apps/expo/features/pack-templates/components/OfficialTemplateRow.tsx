import { Text } from '@packrat/ui/src/text';
import { Icon } from 'expo-app/components/Icon';
import { useWeightUnit } from 'expo-app/features/auth/hooks/useWeightUnit';
import { useColorScheme } from 'expo-app/lib/hooks/useColorScheme';
import { useTranslation } from 'expo-app/lib/hooks/useTranslation';
import { testIds } from 'expo-app/lib/testIds';
import { Image, Pressable, View } from 'react-native';
import type { PackTemplateSummary } from '../hooks/usePackTemplateSummary';
import type { PackTemplateInStore } from '../types';
import { templateCategoryIcon, templateSubtitle } from '../utils/templateSubtitle';

export const OFFICIAL_ROW_ICON_SIZE = 56;

/** The template's cover image, or its category icon on a tinted tile. */
function TemplateIcon({ template }: { template: PackTemplateInStore }) {
  const { colors } = useColorScheme();
  const size = OFFICIAL_ROW_ICON_SIZE;
  const style = { width: size, height: size, borderRadius: 14 };

  if (template.image) {
    return <Image source={{ uri: template.image }} style={style} resizeMode="cover" />;
  }
  return (
    <View style={style} className="items-center justify-center bg-primary/15">
      <Icon
        name="bag-personal"
        size={size * 0.42}
        color={colors.primary}
        materialIcon={{
          type: 'MaterialCommunityIcons',
          name: templateCategoryIcon(template.category),
        }}
      />
    </View>
  );
}

/** Seal shown beside an official template's name. */
export function VerifiedSeal({ size = 16 }: { size?: number }) {
  const { colors } = useColorScheme();
  return (
    <Icon
      name="check-decagram"
      size={size}
      color={colors.primary}
      materialIcon={{ type: 'MaterialCommunityIcons', name: 'check-decagram' }}
    />
  );
}

export function OfficialTemplateRow({
  template,
  summary,
  onPress,
}: {
  template: PackTemplateInStore;
  summary: PackTemplateSummary | undefined;
  onPress: (templateId: string) => void;
}) {
  const { t } = useTranslation();
  const { unit, convertWeight } = useWeightUnit();
  const totalGrams = summary?.totalWeight ?? 0;
  const subtitle = templateSubtitle({
    itemCount: summary?.itemCount ?? 0,
    weightLabel:
      totalGrams > 0 ? `${convertWeight({ weight: totalGrams, fromUnit: 'g' })} ${unit}` : null,
    category: template.category,
    itemWord: t('packTemplates.item'),
    itemsWord: t('packTemplates.items'),
  });

  return (
    <Pressable
      onPress={() => onPress(template.id)}
      android_ripple={{ borderless: false }}
      className="flex-row items-center gap-3 py-2"
      accessibilityRole="button"
      accessibilityLabel={`${template.name}, ${t('packTemplates.official')}, ${subtitle}`}
      testID={testIds.packTemplates.officialRow(template.id)}
    >
      <TemplateIcon template={template} />
      <View className="flex-1">
        <View className="flex-row items-center gap-1">
          <Text className="shrink text-base text-foreground" numberOfLines={2}>
            {template.name}
          </Text>
          <VerifiedSeal />
        </View>
        <Text className="text-sm text-muted-foreground" numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}
