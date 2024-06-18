import { View } from 'react-native';


const Layout = ({ children }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: 'transparent',
        width:'100%',
      }}
    >
      {children}
    </View>
  );
};

export default Layout;
