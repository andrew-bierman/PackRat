import React, { useState, FC } from 'react';
import { View, Platform } from 'react-native';
import { DropdownComponent, RButton, RText } from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useImportPackItem } from 'app/hooks/packs/useImportPackItem';
import { useImportItem } from 'app/hooks/items/useImportItem';
import useResponsive from 'app/hooks/useResponsive';

interface ImportFormProps {
  showSubmitButton?: boolean;
  closeModalHandler?: () => void;
  packId?: string;
  ownerId?: string;
  currentPack?: {
    items: Array<{
      category: {
        name: string;
      };
    }>;
  } | null;
  currentpage?: string;
}

interface SelectedType {
  label: string;
  value: string;
}

const data = [
  { label: 'CSV', value: 'text/csv', key: 'text/csv' },
  { label: 'Other', value: '*/*', key: '*/*' },
];

export const ImportForm: FC<ImportFormProps> = ({
  packId,
  ownerId,
  closeModalHandler,
  currentpage,
}) => {
  const { currentTheme } = useTheme();
  const { handleImportNewItems } = useImportItem();
  const { importPackItem } = useImportPackItem();
  const { xxs } = useResponsive();

  const [selectedType, setSelectedType] = useState<SelectedType>({
    label: 'CSV',
    value: 'text/csv',
  });

  const handleSelectChange = (selectedValue: string) => {
    const newValue = data.find((item) => item.value === selectedValue);
    if (newValue) setSelectedType(newValue);
  };

  const handleItemImport = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: [selectedType.value],
      });

      if (res.canceled) {
        return;
      }

      let fileContent;

      if (selectedType.value === 'text/csv') {
        if (Platform.OS === 'web') {
          if (res.assets && res.assets.length > 0) {
            const file = res.assets[0];
            const base64Content = file.uri.split(',')[1];
            fileContent = atob(base64Content);
          } else {
            throw new Error('No file content available');
          }
        } else {
          const document = res.assets[0];
          const { name, size, mimeType, uri } = document;
          if (mimeType === 'text/csv') {
            fileContent = await FileSystem.readAsStringAsync(uri);
            console.log('File content:', fileContent);
          }
        }
        if (currentpage === 'items') {
          handleImportNewItems({ content: fileContent, ownerId });
        } else {
          importPackItem({ content: fileContent, packId, ownerId });
        }
      }
    } catch (err) {
      console.error('Error importing file:', err);
    } finally {
      closeModalHandler();
    }
  };

  return (
    <View style={{ minWidth: xxs ? 250 : 320 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 10,
        }}
      >
        <DropdownComponent
          value={selectedType}
          data={data}
          onValueChange={handleSelectChange}
          placeholder={`Select file type: ${selectedType.label}`}
          native={true}
          style={{ width: '100%' }}
        />
      </View>
      <RButton onPress={handleItemImport}>
        <RText style={{ color: currentTheme.colors.text }}>Import Item</RText>
      </RButton>
    </View>
  );
};
