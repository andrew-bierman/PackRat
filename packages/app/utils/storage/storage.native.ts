import EventEmitter from 'events';
import * as SecureStore from 'expo-secure-store';

class StorageEventEmitter extends EventEmitter {}
export const storageEvents = new StorageEventEmitter();

export const Storage = {
  getItem: async (key) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (e) {}
  },
  setItem: async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
      storageEvents.emit('change', { key, value });

      return true;
    } catch (e) {}
  },
  removeItem: async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      storageEvents.emit('remove', { key });

      return true;
    } catch (e) {}
  },
};
