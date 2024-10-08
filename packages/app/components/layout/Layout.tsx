import { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';

const Layout = ({
  children,
  customStyle = {},
}: {
  children: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <View
      style={[
        {
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 20,
          alignItems: 'center',
          backgroundColor: 'transparent',
          width: '100%',
        },
        customStyle,
      ]}
    >
      {children}
    </View>
  );
};

export default Layout;
