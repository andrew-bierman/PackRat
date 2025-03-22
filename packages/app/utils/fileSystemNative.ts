import {
  documentDirectory,
  getInfoAsync,
  readAsStringAsync,
  EncodingType,
  writeAsStringAsync,
  makeDirectoryAsync,
  deleteAsync,
} from 'expo-file-system';
export const readFile = async (
  filePath: string,
): Promise<[string, string | null]> => {
  try {
    const fileUri = `${documentDirectory}${filePath}`;

    // Check if the file exists
    const fileInfo = await getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      return ['', `File ${filePath} does not exist.`];
    }

    // Read the file contents as a string
    const content = await readAsStringAsync(fileUri, {
      encoding: EncodingType.UTF8,
    });

    return [content, null];
  } catch (e) {
    return ['', e.message];
  }
};

export const writeFile = async ({
  directory,
  filename,
  data,
}: {
  directory: string;
  filename: string;
  data: string;
}): Promise<[boolean, string | null]> => {
  try {
    const dirPath = `${documentDirectory}${directory}`;
    const filePath = `${dirPath}/${filename}`;

    const dirInfo = await getInfoAsync(dirPath);

    if (!dirInfo.exists) {
      await makeDirectoryAsync(dirPath, { intermediates: true });
    }

    await writeAsStringAsync(filePath, data, {
      encoding: EncodingType.UTF8,
    });

    return [true, null];
  } catch (error) {
    return [false, error];
  }
};

export const deleteFile = async (
  filePath: string,
): Promise<[boolean, string | null]> => {
  try {
    const fileUri = `${documentDirectory}${filePath}`;

    const fileInfo = await getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      return [false, `File ${fileUri} does not exist.`];
    }

    await deleteAsync(fileUri);

    return [true, null];
  } catch (error) {
    return [false, error.message];
  }
};
