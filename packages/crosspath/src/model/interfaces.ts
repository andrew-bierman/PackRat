import { URL } from './types';

export interface Router {
  push: (url: URL) => void;
  replace: (url: URL) => void;
  back: () => void;
}
