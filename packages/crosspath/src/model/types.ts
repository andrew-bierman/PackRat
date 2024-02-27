export type URL =
  | string
  | {
      pathname?: string;
      query?: Record<string, any>;
      state?: Record<string, any>;
      hash?: string;
      as?: string | object;
    };

export type CreateParam = () => {
  useParam: (key: string) => [value: any, setValue: (value: any) => void];
};
