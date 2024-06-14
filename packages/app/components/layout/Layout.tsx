import { View } from 'react-native';
import useResponsive from 'app/hooks/useResponsive';


const Layout = ({ children }) => {
  const { xs,xxs, xxxs } =  useResponsive();
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        backgroundColor: 'transparent',
        width:xxxs? '100vw' : xxs ? '100%' : xs ? '100vw' : '60vw',
        alignSelf: 'center',
      }}
    >
      {children}
    </View>
  );
};

export default Layout;
