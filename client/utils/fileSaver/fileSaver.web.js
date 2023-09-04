import { saveAs } from 'file-saver';

/**
 * Saves a file with the given data, filename, extension, and type.
 *
 * @param {any} data - The data to be saved as a file.
 * @param {string} filename - The name of the file to be saved.
 * @param {string} extension - The extension of the file to be saved.
 * @param {string} type - The type of the file to be saved.
 * @return {void} The file is saved.
 */
export const saveFile = async (data, filename, extension, type) => {
  const blob = new Blob([data], { type });
  saveAs(blob, `${filename}.${extension}`);
};
