import useCustomStyles from '~/hooks/useCustomStyles';
import { useEffect } from 'react';

export const useStyles = (loadStyles) => {
  const styles = useCustomStyles(loadStyles);
  useEffect(() => {
    //   first
    return () => {
      // second
    };
  }, []);

  return { styles };
};
