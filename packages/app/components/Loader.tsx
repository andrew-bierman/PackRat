import React from 'react';
import { RStack, RHeading, RSpinner } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';

const Loader = () => {
  const styles = useCustomStyles(loaderStyles);
  return (
    <RStack style={styles.container}>
      <RSpinner color="#0a84ff" />
      <RHeading style={styles.heading}>Loading</RHeading>
    </RStack>
  );
};

export default Loader;

const loaderStyles = {
  container: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    gap: 8,
  },
  heading: {
    color: '#0a84ff',
    fontSize:20,
  },

};
