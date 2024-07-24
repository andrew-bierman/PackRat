import { View } from 'react-native';

const Layout = ({ children }) => {
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
      }}
    >
      {children}
    </View>
  );
};

export default Layout;
