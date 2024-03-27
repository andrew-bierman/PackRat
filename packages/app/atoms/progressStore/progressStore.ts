import { atom } from 'jotai';
import { produce } from 'immer';
import { useReducerAtom } from 'jotai/utils';
import * as Types from './types';

import EventEmitter from 'events';
import { useEffect } from 'react';

class ProgressEventEmitter extends EventEmitter {}
const progressEvents = new ProgressEventEmitter();

const progressReducer = (prev, action) => {
  return produce(prev, (draft) => {
    switch (action.type) {
      case Types.SET_CURRENT_PROGRESS:
        draft.currentValue = action.payload;
        return draft;
      case Types.SET_TARGET_PROGRESS:
        draft.targetValue = action.payload;
        return draft;
      case Types.RESET_PROGRESS:
        draft.targetValue = action.payload;
        return {
          currentValue: 0,
          targetValue: 0,
        };
      default:
        throw new Error('unknown action type');
    }
  });
};

const progressAtom = atom({
  currentValue: 0,
  targetValue: 0,
});

const useProgressAtom = () => {
  const [progressStore, dispatch] = useReducerAtom(
    progressAtom,
    progressReducer,
  );

  return [progressStore, dispatch];
};

export const useProgressStore = () => {
  const [progressStore] = useProgressAtom();

  return progressStore;
};

export const useProgressListener = () => {
  const [, dispatch] = useProgressAtom();

  useEffect(() => {
    const handler = (evt) => dispatch(evt);
    progressEvents.once('dispatch', handler);
    return () => {
      progressEvents.removeListener('dispatch', handler);
    };
  }, []);
};

export const dispatchProgress = (evt) => progressEvents.emit('dispatch', evt);
