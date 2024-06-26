import { useEffect, useState } from 'react';

export const useEditableText = ({ value, onChange, defaultValue, onSave }) => {
  const [internalValue, setInternalValue] = useState(value ?? defaultValue);

  const currentValue = onChange === undefined ? internalValue : value;

  const handleChange = (e) => {
    const newValue = e.nativeEvent.text; // For React Native

    if (onChange === undefined) {
      setInternalValue(newValue);
    } else {
      onChange(newValue);
    }
  };

  const handleSave = () => {
    onSave(currentValue);
  };

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (value === undefined) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue]);

  return {
    currentValue,
    handleChange,
    handleSave,
  };
};
