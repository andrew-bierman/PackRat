import { RButton } from '@packrat/ui';
import React from 'react';

const CustomButton = ({ children, copy, handler, ...args }) => {
  return (
    <>
      {copy && (
        <RButton
          style={{
            width: '300px',
            marginHorizontal: 'auto',
            marginTop: 10,
          }}
          onPress={handler}
          {...args}
        >
          {children}
        </RButton>
      )}
    </>
  );
};

export default CustomButton;
