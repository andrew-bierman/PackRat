import { Box } from "native-base";
import { Text } from "react-native";
import { theme } from "../theme";

export default function WideColumn() {
  return (
    <Box
      style={{
        paddingHorizontal: 25,
        marginVertical: 15,
        padding: 26,
        borderColor: "#f1f5f9",
        borderWidth: 2,
      }}
    >
      <Text style={{ color: theme.colors.textPrimary, fontSize: 26 }}>
        Wide Column
      </Text>
      <Text>Aligned with the right column</Text>
      <Text style={{ fontWeight: 300 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare
        magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa
        sem. Etiam finibus odio quis feugiat facilisis.
      </Text>
    </Box>
  );
}
