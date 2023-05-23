import React from "react";
import {
  Container,
  Card,
  Text,
  Button,
  View,
  HStack,
  Badge,
  VStack,
} from "native-base";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../theme";

const FeedPreview = () => {
  const dummyData = [
    {
      title: "Sample Trip 1",
      description: "A cool trip to the mountains.",
      type: "trip",
    },
    {
      title: "Sample Pack 1",
      description: "Essentials for a day hike.",
      type: "pack",
    },
  ];

  return (
    <View style={styles.feedPreview}>
      <Text style={styles.feedTitle}>Recent Feed</Text>
      {dummyData.map((item, index) => (
        <Card key={index} style={styles.feedItem}>
          <HStack justifyContent="space-between">
            <Text style={styles.feedItemTitle}>{item.title}</Text>
            <Badge colorScheme="info" textTransform={"capitalize"}>
              {item.type}
            </Badge>
          </HStack>
          <Text>{item.description}</Text>
        </Card>
      ))}
    </View>
  );
};

const Dashboard = () => {
  return (
    <VStack style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome, User!</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.fullWidthButton}
            onPress={() => console.log("Navigate to Create Pack")}
          >
            <Card style={styles.card}>
              <MaterialIcons
                name="backpack"
                size={24}
                color={theme.colors.iconColor}
                style={styles.icon}
              />
              <Text style={styles.text}>Create a Pack</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fullWidthButton}
            onPress={() => console.log("Navigate to Create Trip")}
          >
            <Card style={styles.card}>
              <Ionicons name="navigate" style={styles.icon} />
              <Text style={styles.text}>Create a Trip</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fullWidthButton}
            onPress={() => console.log("Navigate to Feed")}
          >
            <Card style={styles.card}>
              <Ionicons name="newspaper-outline" style={styles.icon} />
              <Text style={styles.text}>Feed</Text>
              <FeedPreview />
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: theme.colors.text,
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: theme.colors.secondaryBlue,
  },
  text: {
    color: theme.colors.text,
  },
  fullWidthButton: {
    width: "100%",
    marginBottom: 10,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
    color: "white",
  },
  button: {
    justifyContent: "center",
  },
  feedPreview: {
    width: "100%",
    marginBottom: 20,
  },
  feedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.text,
  },
  feedItem: {
    backgroundColor: theme.colors.primary,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  feedItemTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 5,
  },
});

export default Dashboard;
