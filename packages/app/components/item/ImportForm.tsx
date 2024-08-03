import React, { useState, FC } from 'react';
import { View, Platform } from 'react-native';
import {
  DropdownComponent,
  RButton,
  RText,
  CascadedDropdownComponent,
} from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import * as DocumentPicker from 'expo-document-picker';
import { useImportPackItem } from 'app/hooks/packs/useImportPackItem';
import { useImportItem } from 'app/hooks/items/useImportItem';
import { useImportFromBucket } from 'app/hooks/items/useImportFromBucket';
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
  { label: 'CSV', value: '.csv', key: '.csv' },
  { label: 'Rei', value: 'rei', key: 'Rei' },
  { label: 'Sierra', value: 'sierra', key: 'Sierra' },
  { label: 'Cabelas', value: 'cabelas', key: 'Cabelas' },
  { label: 'Moosejaw', value: 'moosejaw', key: 'Moosejaw' },
  { label: 'Backcountry', value: 'backcountry', key: 'Backcountry' },
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
  const { handleImportFromBucket } = useImportFromBucket();
  const { xxs } = useResponsive();

  const [selectedType, setSelectedType] = useState<SelectedType>({
    label: 'CSV',
    value: '.csv',
  });

  const handleSelectChange = (selectedValue: string) => {
    const newValue = data.find((item) => item.value === selectedValue);
    if (newValue) setSelectedType(newValue);
  };

  const handleItemImport = async () => {
    try {
      if (selectedType.value === '.csv') {
        const res = await DocumentPicker.getDocumentAsync({
          type: [selectedType.value],
        });

        if (res.canceled) {
          return;
        }

        let fileContent;

        if (Platform.OS === 'web') {
          if (res.assets && res.assets.length > 0) {
            const file = res.assets[0];
            const base64Content = file.uri.split(',')[1];
            fileContent = atob(base64Content);
          } else {
            throw new Error('No file content available');
          }
        } else {
          const response = await fetch(res.uri);
          fileContent = await response.text();
        }

        if (currentpage === 'items') {
          handleImportNewItems({ content: fileContent, ownerId });
        } else {
          importPackItem({ content: fileContent, packId, ownerId });
        }
      } else {
        handleImportFromBucket({ directory: selectedType.value, ownerId });
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
          zIndex: 1,
        }}
      >
        <CascadedDropdownComponent
          value={selectedType}
          data={data}
          onValueChange={handleSelectChange}
          placeholder={`Select file type: ${selectedType.label}`}
          native={true}
          style={{ width: '100%' }}
        />
      </View>
      <RButton onClick={handleItemImport}>
        <RText style={{ color: currentTheme.colors.text }}>Import Item</RText>
      </RButton>
    </View>
  );
};
