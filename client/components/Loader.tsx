import React from 'react';
import { RStack, RHeading, RSpinner } from '@packrat/ui';
const Loader = () => {
  return (
    <RStack
      style={{
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        gap: '8px',
      }}
    >
      <RSpinner color="#0a84ff" />
      <RHeading style={{ color: '#0a84ff', fontSize: '$2' }}>Loading</RHeading>
    </RStack>
  );
};
export default Loader;
