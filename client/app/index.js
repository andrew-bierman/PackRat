
import { useSelector } from "react-redux";

import { Platform } from "react-native";

import ProfileContainer from "../components/user/ProfileContainer";

import ProfileContainerMobile from "../components/user/ProfileContainerMobile";

import { Stack as Header } from "expo-router";

export default function Index() {
  return (
    <ScrollView>
      {Platform.OS === "web" ? (
        <Header.Screen
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: "Home",
          }}
        />
      ) : null}
      <Box style={styles.mutualStyles}>
        <LandingPage />
        <Dashboard />
        <Stack m={[0, 0, 12, 16]} style={{ gap: 25 }}>
          <Box
            style={{
              alignItems: "center",
              textAlign: "center",
              paddingVertical: 18,
              marginTop: Platform.OS !== "web" ? 25 : 1,
            }}
          >
            {Platform.OS === "web" ? (
              <Text style={{ color: "white", fontSize: theme.font.headerFont }}>
                PackRat
              </Text>
            ) : (
              <Text style={{ color: "white", fontSize: 20, fontWeight: 600 }}>
                PackRat
              </Text>
            )}
            <Text style={{ color: "white", fontSize: 18 }}>
              The Ultimate Travel App
            </Text>
          </Box>
          <Card
            title="Where are you heading?"
            isSearch={true}
            Icon={() => (
              <FontAwesome
                name="map"
                size={20}
                color={theme.colors.cardIconColor}
              />
            )}
          />
          
  return Platform.OS === "web" ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Home",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />

      <ProfileContainer />
    </>
  ) : (
    <ProfileContainerMobile />
  );
}


