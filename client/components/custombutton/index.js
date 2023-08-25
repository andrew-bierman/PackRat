import { Button } from 'native-base';
import React from 'react';

const CustomButton = ({ text, handler, ...args }) => {
  const { copy } = { ...args };
  return (
    <>
      {copy && (
        <Button
          style={{
            width: '20rem',
            marginHorizontal: 'auto',
            marginTop: 10,
          }}
          onPress={handler}
        >
          {text}
        </Button>
      )}
    </>
  );
};

export default CustomButton;
