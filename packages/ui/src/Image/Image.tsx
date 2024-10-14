import React, { type FC } from 'react';
import { Image as RNImage, type ImageProps } from 'react-native';

export const Image: FC<ImageProps> = (props) => {
  return <RNImage {...props} />;
};
