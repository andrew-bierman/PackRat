import { HStack } from "native-base";
import QuickActionButton from "./QuickActionButton";
import { StyleSheet } from "react-native";
import { theme } from "../../theme";
import { useRouter } from "expo-router";

const QuickActionsSection = () => {
  const router = useRouter();

  const quickActionData = [
    {
      action: "createPack",
      iconName: "backpack",
      text: "Create a Pack",
    },
    {
      action: "createTrip",
      iconName: "navigation",
      text: "Create a Trip",
    },
  ];

  const handleActionSelect = (action) => {
    if(action === "createPack") {
      router.push("/pack/create");
    } else if(action === "createTrip") {
      router.push("/trip/create");
    }
  };

  return (
    <HStack style={styles.section}>
      {quickActionData.map((action) => (
        <QuickActionButton
          key={action.action}
          onPress={() => handleActionSelect(action.action)}          
          iconName={action.iconName}
          text={action.text}
        />
      ))}
    </HStack>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    paddingHorizontal: 20, // Added padding here.
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: theme.colors.secondaryBlue,
  },
});

export default QuickActionsSection;
