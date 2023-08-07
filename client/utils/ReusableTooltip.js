import { Tooltip } from "native-base";
import { Platform } from "react-native";
import React from "react"; // Import React if not already imported
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons
import { theme } from "../theme";
import { Button } from "native-base";

const ReusableTooltip = ({ label, placement, openDelay }) => {
  return (
    <>
      {Platform.OS === "web" ? (
        <Tooltip
          label={label}
          placement={"top"}
          openDelay={500}
        >
          {/* Only display MaterialIcons */}
          <Button
            width={8}
            height={8}
            style={{ backgroundColor: "none" }}
            >
            <MaterialIcons
            name="info-outline"
            size={20}
            color={theme.colors.background}
            />
        </Button>
        </Tooltip>
      ) : null}
    </>
  );
};

export default ReusableTooltip;
