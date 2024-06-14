import { View } from 'react-native';
import { useMedia } from 'tamagui';

const Layout = ({ children }) => {
  const { xs,xxs } = useMedia();
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        backgroundColor: 'transparent',
        width:xxs ? '100%' : xs ? '100vw' : '60vw',
        alignSelf: 'center',
      }}
    >
      {children}
    </View>
  );
};

export default Layout;
