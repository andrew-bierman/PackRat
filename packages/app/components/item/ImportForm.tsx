import React, { useState } from 'react';
import {
  RText,
  Form as OriginalForm,
  SubmitButton,
  DropdownComponent,
} from '@packrat/ui';
import { View } from 'react-native';
import useTheme from '../../hooks/useTheme';
import { type Item } from '@packrat/validations';

const Form: any = OriginalForm;

const data = [
  { label: 'CSV', value: '.csv', key: '.csv' },
  { label: 'Other', value: '*', key: '*' },
];

interface ImportFormProps {
  handleSubmit: (data: Item) => void;
  showSubmitButton?: boolean;
  isLoading: boolean;
  isEdit?: boolean;
  validationSchema: any; // Consider replacing `any` with a specific type for your validation schema
  currentPack?: {
    items: Array<{
      category: {
        name: string;
      };
    }>;
  } | null;
}

export const ImportForm = ({
  handleSubmit,
  showSubmitButton = true,
  isLoading,
  isEdit,
  validationSchema,
}: ImportFormProps) => {
  const { currentTheme } = useTheme();
  const [selectedType, setSelectedType] = useState({
    label: 'CSV',
    value: '.csv',
  });

  const handleSelectChange = (selectedValue) => {
    const newValue = data.find((item) => item.value === selectedValue);
    if (newValue) {
      setSelectedType(newValue);
    } else {
      console.error('Selected value does not exist in data');
    }
  };

  return (
    <View style={{ minWidth: 320 }}>
      <Form
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        style={{ width: '100%' }}
      >
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
            placeholder={`Select Weight unit: ${selectedType.label}`}
            native={true}
            style={{ width: '100%' }}
          />
        </View>
        {showSubmitButton && (
          <SubmitButton onSubmit={handleSubmit}>
            <RText style={{ color: currentTheme.colors.text }}>
              {isLoading ? 'Loading..' : isEdit ? 'Edit item' : 'Import Item'}
            </RText>
          </SubmitButton>
        )}
      </Form>
    </View>
  );
};
