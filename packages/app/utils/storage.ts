import EventEmitter from 'events';
import * as SecureStore from 'expo-secure-store';

const isNextApp = process.env.NEXT_PUBLIC_APP === 'next';

class StorageEventEmitter extends EventEmitter {}
export const storageEvents = new StorageEventEmitter();

const expoStorage = {
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

const nextStorage = {
  getItem: async (key) => {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch {
      console.error('Failed to load data from storage');
    }
    return null;
  },
  setItem: async (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      storageEvents.emit('change', { key, value });

      return true;
    } catch {
      console.error('Failed to change data from storage');
    }
    return false;
  },
  removeItem: async (key) => {
    try {
      window.localStorage.removeItem(key);
      storageEvents.emit('remove', { key });

      return true;
    } catch {
      console.error('Failed to remove data from storage');
    }
    return false;
  },
};

const Storage = isNextApp ? nextStorage : expoStorage;
export default Storage;
