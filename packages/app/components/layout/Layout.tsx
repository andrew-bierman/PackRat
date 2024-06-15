import { useScreenWidth } from 'app/hooks/common';
import { SCREEN_WIDTH } from 'app/constants/breakpoint';
import { Platform, View } from 'react-native';

const Layout = ({ children }) => {
  const { screenWidth } = useScreenWidth();
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        backgroundColor: 'transparent',
        width:
          Platform.OS === 'web'
            ? screenWidth <= SCREEN_WIDTH
              ? '100vw'
              : '90vw'
            : '100%',
        alignSelf: 'center',
      }}
    >
      {children}
    </View>
  );
};

export default Layout;
