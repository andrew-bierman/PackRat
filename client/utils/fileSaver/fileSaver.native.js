import * as FileSystem from 'expo-file-system';

export const saveFile = async (data, filename, extension, encoding = FileSystem.EncodingType.UTF8) => {
  const fileUri = FileSystem.documentDirectory + `${filename}.${extension}`;
  await FileSystem.writeAsStringAsync(fileUri, data, { encoding });
  await FileSystem.downloadAsync(fileUri, FileSystem.cacheDirectory + `${filename}.${extension}`);
};
