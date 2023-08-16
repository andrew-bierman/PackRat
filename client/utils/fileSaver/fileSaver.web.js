import { saveAs } from 'file-saver';

export const saveFile = async (data, filename, extension, type) => {
    const blob = new Blob([data], { type });
    saveAs(blob, `${filename}.${extension}`);
  };
  