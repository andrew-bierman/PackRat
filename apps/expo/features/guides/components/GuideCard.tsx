import { CardContent, CardTitle } from '@packrat/ui/src/card';
import { Text } from '@packrat/ui/src/text';
import { useTranslation } from 'expo-app/lib/hooks/useTranslation';
import { testIds } from 'expo-app/lib/testIds';
import { TouchableOpacity, View } from 'react-native';
import type { Guide } from '../types';

interface GuideCardProps {
  guide: Guide;
  onPress: () => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide, onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="pt-4"
      testID={testIds.guides.card(guide.id)}
    >
      {/*
        A plain RN surface, not `Card`. On Android `Card` is a Compose card whose RN children are
        hosted through `RNHostView matchContents`, which reports its size asynchronously after
        mount. In a FlatList every row therefore mounts at the wrong height and resizes a frame
        later, so cards render blank or clipped and the rows below jump while the list loads and
        scrolls (#2767).
      */}
      <View className="mb-3 rounded-xl bg-card" style={{ elevation: 2 }}>
        <CardContent className="p-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              {guide.difficulty && <Text variant="footnote">{guide.difficulty}</Text>}
              <CardTitle className="text-lg font-semibold mb-1">{guide.title}</CardTitle>
              {guide.description && (
                <Text
                  className="text-sm text-gray-600 dark:text-gray-400 mb-2"
                  numberOfLines={2}
                  wrap
                >
                  {guide.description}
                </Text>
              )}
              <View className="flex-col gap-2">
                {guide.categories && guide.categories.length > 0 ? (
                  <View className="flex-row flex-wrap gap-1.5">
                    {guide.categories.slice(0, 2).map((category) => (
                      <View key={category} className="bg-primary/10 px-2 py-1 rounded-full">
                        <Text className="text-xs font-medium text-primary">
                          {category
                            .split('-')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                        </Text>
                      </View>
                    ))}
                    {guide.categories.length > 2 && (
                      <View className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                        <Text className="text-xs text-gray-600 dark:text-gray-400">
                          +{guide.categories.length - 2}
                        </Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <View className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full self-start">
                    <Text className="text-xs text-gray-700 dark:text-gray-300">
                      {guide.category}
                    </Text>
                  </View>
                )}
                <View className="flex-row items-center gap-2">
                  {guide.author && (
                    <Text className="text-xs text-gray-600 dark:text-gray-400">
                      {t('guides.by')} {guide.author}
                    </Text>
                  )}
                  {guide.readingTime && (
                    <Text className="text-xs text-gray-600 dark:text-gray-400">
                      • {guide.readingTime}
                    </Text>
                  )}
                  <Text className="text-xs text-gray-500 dark:text-gray-500 self-end">
                    {new Date(guide.updatedAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </CardContent>
      </View>
    </TouchableOpacity>
  );
};
