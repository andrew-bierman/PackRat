import { View } from 'react-native';


const Layout = ({ children }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
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
