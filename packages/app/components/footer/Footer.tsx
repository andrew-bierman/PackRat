import { Text, View } from 'react-native';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';

export default function Footer() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const year = new Date().getFullYear();
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: currentTheme.colors.card,
        padding: 15,

        alignSelf: 'center',
        position: 'relative',
        bottom: 0,
      }}
    >
      <Text
        style={{
          color: currentTheme.colors.tertiaryBlue,
          fontSize: currentTheme.font.size,
          textAlign: 'center',
        }}
      >
        Copyright &copy; {year}
      </Text>
    </View>
  );
}
