import { useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../auth/provider";
import UserProfileContainer from '../../components/user/UserProfileContainer';
import { Platform } from "react-native";
import UserProfileContainerMobile from '../../components/user/UserProfileContainerMobile';
import { Stack as Header } from "expo-router";

const Profile = () => {
  const { id } = useSearchParams();

  return Platform.OS === "web" ? (
    <>
      <UserProfileContainer id={id} />
    </>
  ) : (
      <UserProfileContainer id={id} />
    // <UserProfileContainerMobile id={id} />
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
