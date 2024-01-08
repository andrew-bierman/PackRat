import { RButton } from '@packrat/ui';
import React from 'react';

export const CustomButton = ({ style = {}, ...props }) => {
  return (
    <RButton
      style={{
        width: '300px',
        marginHorizontal: 'auto',
        marginTop: 10,
        ...style,
      }}
      {...props}
    />
  );
};
