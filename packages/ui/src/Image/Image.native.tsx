import React, { type FC } from 'react';
import RNImage, { type FastImageProps } from 'react-native-fast-image';

export const Image: FC<FastImageProps> = (props) => {
  return <RNImage {...props} />;
};
