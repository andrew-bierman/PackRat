import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
