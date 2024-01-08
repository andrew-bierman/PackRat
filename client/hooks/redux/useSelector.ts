import {
  type TypedUseSelectorHook,
  useSelector as useSelectorRaw,
} from 'react-redux';
import { type RootState } from 'store/store';

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRaw;
