import React, { useState, FC } from 'react';
import { View, Platform } from 'react-native';
import { DropdownComponent, RButton, RText } from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import * as DocumentPicker from 'expo-document-picker';
import Papa from 'papaparse';
import { InformUser } from 'app/utils/ToastUtils';
import { useAddPackItem } from 'app/hooks/packs/useAddPackItem';
import { useAddItem } from 'app/hooks/items';

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
  { label: 'Other', value: '*', key: '*' },
];

export const ImportForm: FC<ImportFormProps> = ({
  packId,
  ownerId,
  closeModalHandler,
  currentpage,
}) => {
  const { currentTheme } = useTheme();
  const { addPackItem } = useAddPackItem();
  const { handleAddNewItem } = useAddItem();

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
      const res = await DocumentPicker.getDocumentAsync({
        type: [selectedType.value],
      });

      if (res.canceled) {
        console.log('User canceled file picker');
        return;
      }

      console.log(res);

      let fileContent;

      if (selectedType.value === '.csv') {
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

        Papa.parse(fileContent, {
          header: true,
          complete: (result) => {
            const expectedHeaders = [
              'Name',
              'Weight',
              'Unit',
              'Quantity',
              'Category',
            ];
            // Get headers from the parsed result
            const parsedHeaders = result.meta.fields;
            try {
              // Check if all expected headers are present
              const allHeadersPresent = expectedHeaders.every((header) =>
                parsedHeaders.includes(header),
              );
              if (!allHeadersPresent) {
                throw new Error(
                  'CSV does not contain all the expected Item headers',
                );
              }
              const data = result.data.map((item, index) => {
                return {
                  id: `${Date.now().toString()}${index}`,
                  name: item.Name,
                  weight: Number(item.Weight),
                  unit: item.Unit,
                  quantity: Number(item.Quantity),
                  type: item.Category,
                  packId: packId,
                  ownerId: ownerId,
                };
              });

              console.log(data);

              if (currentpage === 'items') {
                data.forEach((item, index) => {
                  if (index < data.length - 1) {
                    handleAddNewItem(item, () => {
                      InformUser({
                        title: 'Items imported successfully',
                        placement: 'bottom',
                        duration: 3000,
                        style: { backgroundColor: 'green' },
                      });
                    });
                  }
                });
              } else {
                data.forEach((item, index) => {
                  if (index < data.length - 1) {
                    addPackItem(item);
                  }
                });
              }
            } catch (error) {
              InformUser({
                title:
                  'CSV does not contain the expected Item headers or data must be corrupt',
                placement: 'bottom',
                duration: 3000,
                style: { backgroundColor: 'red' },
              });
            } finally {
              closeModalHandler();
            }
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      }
    } catch (err) {
      console.error('Error importing file:', err);
    }
  };

  return (
    <View style={{ minWidth: 320 }}>
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
      <RButton onClick={handleItemImport}>
        <RText style={{ color: currentTheme.colors.text }}>Import Item</RText>
      </RButton>
    </View>
  );
};
