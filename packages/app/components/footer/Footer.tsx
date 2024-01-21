import { Text, View } from 'react-native';
import { useFooter } from 'hooks/footer/footer';
export default function Footer() {
  const { currentTheme, year } = useFooter();

  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: currentTheme.colors.card,
        padding: 15,
        alignSelf: 'center',
        position: 'relative',
        bottom: 0,
      }}
    >
      <Text
        style={{
          color: currentTheme.colors.textColor,
          fontSize: currentTheme.font.size,
          textAlign: 'center',
        }}
      >
        Copyright &copy; {year}
      </Text>
    </View>
  );
}
