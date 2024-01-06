import { TypedUseSelectorHook, useSelector as useSelectorRaw } from 'react-redux';
import { RootState } from 'store/store';

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRaw;