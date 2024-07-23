import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

const loadDocumentPicker = async () => {
  if (Platform.OS === 'web') {
    const { default: DocumentPickerWeb } = await import('./DocumentPickerWeb');
    return DocumentPickerWeb;
  } else {
    const { default: DocumentPickerNative } = await import(
      './DocumentPickerNative'
    );
    return DocumentPickerNative;
  }
};

const useDocumentPicker = () => {
  const [DocumentPicker, setDocumentPicker] = useState(null);

  useEffect(() => {
    const loadPicker = async () => {
      const picker = await loadDocumentPicker();
      setDocumentPicker(() => picker);
    };
    loadPicker();
  }, []);

  return DocumentPicker;
};

export default useDocumentPicker;
