import { useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Platform } from "react-native";
import { Stack as Header } from "expo-router";
import ProfileContainer from "../../screens/user/ProfileContainer";

const Profile = () => {
  const { id } = useSearchParams();

  return Platform.OS === "web" ? (
    <>
      <Header.Screen
        options={{
          title: `${id}'s Profile`
        }}
      />
      <ProfileContainer id={id} />
    </>
  ) : (
    <ProfileContainer id={id} />
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
});

export default Profile;
