import React, { useState } from "react";
import { Box, Container } from "native-base";
import { useBreakpointValue } from "native-base";
import { StyleSheet } from "react-native";
import SideBar from "./Sidebar";
import TopBar from "./Topbar";
import GeneralContent from "./GeneralContent";
import ItemsContent from "./ItemsContent";
import { theme } from "../../../theme";

const UserSetting = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [username, setUsername] = useState("saqib");
  const [email, setEmail] = useState("saqib@gmail.com");
  const [password, setPassword] = useState("asdasdasd");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [weightUnits, setWeightUnits] = useState("125");
  const [weatherUnits, setWeatherUnits] = useState("hello g");

  const isBaseSize = useBreakpointValue({ base: true, md: false });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box
      flex={1}
      style={isBaseSize ? styles.mobmainContainer : styles.mainContainer}
    >
      <SideBar activeTab={activeTab} handleTabClick={handleTabClick} />
      <TopBar activeTab={activeTab} handleTabClick={handleTabClick} />
      <Box w={"100%"} style={styles.content} flex={1}>
        {activeTab === "General" ? (
          <GeneralContent
            profilePhoto={profilePhoto}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        ) : (
          <ItemsContent
            weightUnits={weightUnits}
            setWeightUnits={setWeightUnits}
            weatherUnits={weatherUnits}
            setWeatherUnits={setWeatherUnits}
          />
        )}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    minHeight: "100vh",
    fontSize: theme.font.headerFont,
    width: "100%",
  },
  mobmainContainer: {
    flexDirection: "column", // Change to column for mobile layout
    fontSize: theme.font.headerFont,
    minHeight: "100vh",
    width: "100%",
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: theme.padding.paddingDesktop, // Use mobile padding
  },
});

export default UserSetting;
