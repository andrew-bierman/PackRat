import { FC } from 'react';
import { LinkProps } from 'solito/link';
export interface CreateParamOptions {
  initial?: string;
  parse?: (param: string) => unknown;
  stringify?: (param: unknown) => string;
}
export interface Router {
  push: (url: URL) => void;
  replace: (url: URL) => void;
  back: () => void;
}
export type LinkComponent = FC<LinkProps>;
export type URL =
  | string
  | {
      pathname?: string;
      query?: Record<string, any>;
      state?: Record<string, any>;
      hash?: string;
      as?: string | object;
    };
export type CreateParam = <T>() => {
  useParam: (
    key: keyof T,
    options?: CreateParamOptions,
  ) => [value: any, setValue: (value: any) => void];
  useParams: (key: keyof T) => {
    params: T;
    setParams: (value: any) => void;
  };
};
