import * as Types from './types';

export const setCurrentProgress = (payload) => {
  return {
    type: Types.SET_CURRENT_PROGRESS,
    payload,
  };
};

export const setTargetProgress = (payload) => {
  return {
    type: Types.SET_TARGET_PROGRESS,
    payload,
  };
};

export const resetProgress = () => {
  return {
    type: Types.RESET_PROGRESS,
  };
};
