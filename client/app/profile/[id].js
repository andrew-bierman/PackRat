import { useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../auth/provider";
import UserProfileContainer from '../../components/user/UserProfileContainer';
import { Platform } from "react-native";
import UserProfileContainerMobile from '../../components/user/UserProfileContainerMobile';
import { Stack as Header } from "expo-router";

const CatDetails = () => {
  const { user } = useAuth();
  const [cat, setCat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useSearchParams();

  useEffect(() => {
    console.log("sdfsfsd");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return Platform.OS === "web" ? (
    <>
      <UserProfileContainer id={id} />
    </>
  ) : (
    <UserProfileContainerMobile id={id} />
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

export default CatDetails;
