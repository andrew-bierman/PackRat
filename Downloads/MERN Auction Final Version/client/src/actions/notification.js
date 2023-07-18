import { ADD_NOTIFICATION } from './types';

export function addNotification(message, level) {
  return {
    type: ADD_NOTIFICATION,
    message,
    level
  };
}
