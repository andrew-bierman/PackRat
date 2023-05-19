import { Box } from "native-base";
import { Text } from "react-native";
import { theme } from "../../theme";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Box
      style={{
        width: "100%",
        textAlign: "center",
        backgroundColor: theme.colors.card,
        padding: 15,
        alignSelf: "center",
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: theme.font.size,
          textAlign: "center",
        }}
      >
        Copyright &copy; {year}
      </Text>
    </Box>
  );
}
