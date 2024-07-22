export default {
  pick: async ({ type }) => {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = type.join(','); // Accept multiple types if provided
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          resolve([file]);
        } else {
          reject(new Error('No file selected'));
        }
      };
      input.click();
    });
  },
  types: {
    allFiles: '*/*',
  },
  isCancel: () => false,
};
