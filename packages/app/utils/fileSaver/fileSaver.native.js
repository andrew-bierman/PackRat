import * as FileSystem from 'expo-file-system';

/**
 * Saves a file with the given data, filename, extension, and encoding.
 *
 * @param {any} data - The data to be saved.
 * @param {string} filename - The name of the file.
 * @param {string} extension - The extension of the file.
 * @param {string} [encoding=FileSystem.EncodingType.UTF8] - The encoding of the file.
 * @return {Promise<void>} A promise that resolves when the file is saved.
 */
export const saveFile = async (
  data,
  filename,
  extension,
  encoding = FileSystem.EncodingType.UTF8,
) => {
  const fileUri = FileSystem.documentDirectory + `${filename}.${extension}`;
  await FileSystem.writeAsStringAsync(fileUri, data, { encoding });
  await FileSystem.downloadAsync(
    fileUri,
    FileSystem.cacheDirectory + `${filename}.${extension}`,
  );
};
