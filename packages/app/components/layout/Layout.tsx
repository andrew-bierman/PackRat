import { View } from 'react-native';


const Layout = ({ children }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width:'100%',
        alignSelf: 'center',
      }}
    >
      {children}
    </View>
  );
};

export default Layout;
