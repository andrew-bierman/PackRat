import { useRef } from 'react';
import { TextInput } from 'react-native';

import { useEditableText } from './useEditableText';
import { LoadingPlaceholder } from '../LoadingPlaceholder';
import { useInputFocus } from './useInputFocus';

interface EditableTextProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  onSave: (value: string) => void;
  isFocused: boolean;
  defaultValue: string;
  isLoading: boolean;
}

export const EditableText = ({
  value,
  onChange,
  onSave,
  isFocused,
  defaultValue,
  isLoading,
}: EditableTextProps) => {
  const inputRef = useRef(null);
  const { currentValue, handleChange, handleSave } = useEditableText({
    value,
    onChange,
    onSave,
    defaultValue,
  });
  useInputFocus(inputRef, isFocused);

  return (
    <>
      {isLoading && <LoadingPlaceholder color="#e2e1eb" />}
      <TextInput
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          // TODO change to theme value: currentTheme.colors.textPrimary
          color: '#0284c7',
          pointerEvents: 'auto',
        }}
        ref={inputRef}
        onChange={handleChange}
        value={currentValue}
        onBlur={handleSave}
      />
    </>
  );
};
