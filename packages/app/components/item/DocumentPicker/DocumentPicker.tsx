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

const DocumentPicker = await loadDocumentPicker();

export default DocumentPicker;
