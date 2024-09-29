import React, { useState, useEffect, FC } from 'react';
import { View, Platform } from 'react-native';
import { RButton, RText, CascadedDropdownComponent } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import * as DocumentPicker from 'expo-document-picker';
import { useImportItem, useImportFromBucket } from '../hooks';
import { useImportPackItem } from '../../pack/hooks';
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

const options = [
  { label: 'bucket 1', value: 'bucket 1', key: 'bucket 1' },
  { label: 'bucket 2', value: 'bucket 2', key: 'bucket 1' },
  { label: 'bucket 3', value: 'bucket 3', key: 'bucket 1' },
  { label: 'bucket 4', value: 'bucket 4', key: 'bucket 1' },
  { label: 'bucket 5', value: 'bucket 5', key: 'bucket 1' },
];

const csvOption = [{ label: 'CSV', value: '.csv', key: '.csv' }];

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

  const [buttonText, setButtonText] = useState('Import Item');
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isImporting) {
      interval = setInterval(() => {
        setButtonText((prev) => {
          if (prev.endsWith('...')) {
            return 'Importing';
          } else {
            return prev + '.';
          }
        });
      }, 500);
    } else {
      setButtonText('Import Item');
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isImporting]);

  const handleSelectChange = (selectedValue: string) => {
    const newValue = [...csvOption, ...options].find(
      (item) => item.value === selectedValue,
    );
    if (newValue) setSelectedType(newValue);
  };

  const handleItemImport = async () => {
    setIsImporting(true);
    try {
      if (selectedType.value === '.csv') {
        const res = await DocumentPicker.getDocumentAsync({
          type: [selectedType.value],
        });

        if (res.canceled) {
          setIsImporting(false);
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
          handleImportNewItems({ content: fileContent, ownerId }, () => {
            setIsImporting(false);
            closeModalHandler();
          });
        } else {
          importPackItem({ content: fileContent, packId, ownerId });
          setIsImporting(false);
          closeModalHandler();
        }
      } else {
        handleImportFromBucket(
          { directory: selectedType.value, ownerId },
          () => {
            setIsImporting(false);
            closeModalHandler();
          },
        );
      }
    } catch (err) {
      console.error('Error importing file:', err);
      setIsImporting(false);
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
          value={selectedType.value}
          data={[
            ...(currentpage !== 'items'
              ? csvOption
              : [...csvOption, ...options]),
          ]}
          onValueChange={handleSelectChange}
          placeholder={`Select file type: ${selectedType.label}`}
          native={true}
          style={{ width: '100%' }}
        />
      </View>
      <RButton onClick={handleItemImport} disabled={isImporting}>
        <RText style={{ color: currentTheme.colors.text }}>{buttonText}</RText>
      </RButton>
    </View>
  );
};
