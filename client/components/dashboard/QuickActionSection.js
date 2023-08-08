import { HStack } from "native-base";
import QuickActionButton from "./QuickActionButton";
import { StyleSheet,View } from "react-native";
import { theme } from "../../theme";
import { useRouter } from "expo-router";
import  ReusableTooltip  from "../../utils/ReusableTooltip";


const QuickActionsSection = () => {
  const router = useRouter();

  const quickActionData = [
    {
      action: "createPack",
      iconName: "backpack",
      text: "Create a Pack",
      tooltip: "Create a pack and add items to it."
    },
    {
      action: "createTrip",
      iconName: "navigation",
      text: "Create a Trip",
      tooltip: "Create a trip and add packs to it"
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
        <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <QuickActionButton
            key={action.action}
            onPress={() => handleActionSelect(action.action)}          
            iconName={action.iconName}
            text={action.text}
          />
          <ReusableTooltip
          label={action.tooltip}
          placement="top"
          openDelay={500}
          />
      </View>
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
