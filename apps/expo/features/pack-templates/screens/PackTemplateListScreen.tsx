import { getAppBarOptions } from '@packrat/ui/src/app-bar';
import { Button } from '@packrat/ui/src/button';
import { SearchOverlay } from '@packrat/ui/src/search-overlay';
import { Text } from '@packrat/ui/src/text';
import { Icon } from 'expo-app/components/Icon';
import { useColorScheme } from 'expo-app/lib/hooks/useColorScheme';
import { useTranslation } from 'expo-app/lib/hooks/useTranslation';
import { testIds } from 'expo-app/lib/testIds';
import { Stack, useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { FlatList, Pressable, SafeAreaView, ScrollView, View } from 'react-native';
import { OfficialTemplateRow } from '../components/OfficialTemplateRow';
import { OfficialShelfHeader, OfficialTemplatesShelf } from '../components/OfficialTemplatesShelf';
import { PackTemplateCard } from '../components/PackTemplateCard';
import { usePackTemplates } from '../hooks';
import { usePackTemplateSummaries } from '../hooks/usePackTemplateSummary';
import { templateSearchValueAtom } from '../packTemplateListAtoms';
import type { PackTemplate } from '../types';

function CreateTemplateIconButton({ onPress }: { onPress: () => void }) {
  const { colors } = useColorScheme();

  return (
    <Pressable onPress={onPress}>
      <Icon name="plus" color={colors.foreground} />
    </Pressable>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <Text className="px-4 pb-1 pt-4 text-2xl font-bold text-foreground">{children}</Text>;
}

export function PackTemplateListScreen() {
  const router = useRouter();
  const templates = usePackTemplates();
  const [searchValue, setSearchValue] = useAtom(templateSearchValueAtom);
  const { t } = useTranslation();

  const official = useMemo(() => templates.filter((tpl) => tpl.isAppTemplate), [templates]);
  const mine = useMemo(() => templates.filter((tpl) => !tpl.isAppTemplate), [templates]);
  const officialIds = useMemo(() => official.map((tpl) => tpl.id), [official]);
  const summaries = usePackTemplateSummaries({ templateIds: officialIds });

  const query = searchValue.trim().toLowerCase();
  const matches = useCallback(
    (tpl: { name: string }) => tpl.name.toLowerCase().includes(query),
    [query],
  );
  const officialResults = useMemo(() => official.filter(matches), [official, matches]);
  const mineResults = useMemo(() => mine.filter(matches), [mine, matches]);

  const openTemplate = useCallback(
    (id: string) => router.push({ pathname: '/pack-templates/[id]', params: { id } }),
    [router],
  );
  const handleCardPress = useCallback(
    (template: PackTemplate) => openTemplate(template.id),
    [openTemplate],
  );
  const handleCreatePackTemplate = () => router.push({ pathname: '/pack-templates/new' });
  const openOfficialList = () => router.push({ pathname: '/pack-templates/official' });

  const renderSearchContent = () => {
    if (!query) {
      return (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-muted-foreground">{t('packTemplates.searchTemplates')}</Text>
        </View>
      );
    }

    if (officialResults.length === 0 && mineResults.length === 0) {
      return (
        <View className="flex-1 items-center justify-center p-8">
          <View className="mb-4 rounded-full bg-muted p-4">
            <Icon name="magnify" size={32} color="text-muted-foreground" />
          </View>
          <Text className="mb-1 text-lg font-medium text-foreground">
            {t('packTemplates.noTemplatesFound')}
          </Text>
          <Text className="text-center text-muted-foreground">
            {t('packTemplates.tryDifferentSearch')}
          </Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {officialResults.length > 0 && (
          <>
            <SectionTitle>{t('packTemplates.official')}</SectionTitle>
            <View className="px-4">
              {officialResults.map((template) => (
                <OfficialTemplateRow
                  key={template.id}
                  template={template}
                  summary={summaries[template.id]}
                  onPress={openTemplate}
                />
              ))}
            </View>
          </>
        )}
        {mineResults.length > 0 && (
          <>
            <SectionTitle>{t('packTemplates.myTemplates')}</SectionTitle>
            {mineResults.map((template) => (
              <View className="px-4 pt-4" key={template.id}>
                <PackTemplateCard templateId={template.id} onPress={handleCardPress} />
              </View>
            ))}
          </>
        )}
      </ScrollView>
    );
  };

  const listHeader = (
    <View>
      {official.length > 0 && (
        <>
          <OfficialShelfHeader onPress={openOfficialList} />
          <OfficialTemplatesShelf
            templates={official}
            summaries={summaries}
            onTemplatePress={openTemplate}
          />
        </>
      )}
      <SectionTitle>{t('packTemplates.myTemplates')}</SectionTitle>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen
        options={{
          ...getAppBarOptions(),
          title: t('packTemplates.packTemplates'),
          headerRight: () => <CreateTemplateIconButton onPress={handleCreatePackTemplate} />,
        }}
      />
      <SearchOverlay
        placeholder={t('packTemplates.searchPlaceholder')}
        value={searchValue}
        onChangeText={setSearchValue}
        androidHeaderRightActions={<CreateTemplateIconButton onPress={handleCreatePackTemplate} />}
      >
        {renderSearchContent()}
      </SearchOverlay>

      <FlatList
        data={mine}
        keyExtractor={(item) => item.id}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 24 }}
        ListHeaderComponent={listHeader}
        renderItem={({ item }) => (
          <View className="px-4 pt-4">
            <PackTemplateCard templateId={item.id} onPress={handleCardPress} />
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center px-8 py-10" testID={testIds.packTemplates.mineEmpty}>
            <View className="mb-4 rounded-full bg-muted p-4">
              <Icon name="file-document-multiple-outline" size={32} color="text-muted-foreground" />
            </View>
            <Text className="mb-1 text-lg font-medium text-foreground">
              {t('packTemplates.noTemplatesYet')}
            </Text>
            <Text className="mb-6 text-center text-muted-foreground">
              {t('packTemplates.noTemplatesYetMessage')}
            </Text>
            <Button onPress={handleCreatePackTemplate}>
              <Text>{t('packTemplates.newTemplate')}</Text>
            </Button>
          </View>
        }
      />
    </SafeAreaView>
  );
}
