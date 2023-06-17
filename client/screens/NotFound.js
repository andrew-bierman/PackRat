import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Link, useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { goBackOrNavigateTo } from "../utils/navigationUtility";
import { theme } from "../theme";

const NotFoundPage = () => {
  const navigation = useNavigation();

  const goBack = () => {
    goBackOrNavigateTo(navigation, "Home");
  };

  return (
    <View style={styles.container}>
      <Feather name="alert-circle" style={styles.icon} />
      <Text style={styles.text}>Oops! Page Not Found</Text>
      <Text style={styles.description}>
        The page you're looking for does not exist.
      </Text>
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go to Homepage</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    fontSize: 60,
    color: theme.colors.primary,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NotFoundPage;
