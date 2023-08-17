import React from "react";
import { Platform, StyleSheet } from "react-native";
import { VStack, Box, ScrollView } from "native-base";
import { theme } from "../../theme";
import UseTheme from '../../hooks/useTheme';
import HeroBanner from "./HeroBanner";
import QuickActionsSection from "./QuickActionSection";
import FeedPreview from "./FeedPreview";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

const Dashboard = () => {
  return (
    <ScrollView contentContainerStyle={styles().content} horizontal={false}>

      <VStack
        style={[
          styles().container,
          Platform.OS === "web" ? { minHeight: "100vh" } : null,
        ]}
      >
        <Box>
          <HeroBanner style={styles().cardContainer} />

          <Section>
            <SectionHeader iconName="add-circle-outline" text="Quick Actions" />
            <QuickActionsSection />
          </Section>

          <Section>
            <SectionHeader iconName="newspaper-outline" text="Feed" />
            <FeedPreview />
          </Section>
        </Box>
      </VStack>
    </ScrollView>
  );
};

const styles = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } = UseTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: currentTheme.colors.background,
      width: "100%",
    },
    content: {
      flexGrow: 1,
      justifyContent: "flex-start",
      alignItems: "stretch",
      paddingHorizontal: 20,
    },
    cardContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
      marginBottom: 20,
      width: "100%",
    },
  });
} 

export default Dashboard;
