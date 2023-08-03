import About from "../../screens/about";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { Stack as Header } from "expo-router";

export default function AboutRoute() {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.menuBar}
    >
      {Platform.OS === "web" ?
        <>
          <Header.Screen
            options={{
              // https://reactnavigation.org/docs/headers#setting-the-header-title
              title: "About",
              // https://reactnavigation.org/docs/headers#adjusting-header-styles

              // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
            }}
          />
          <About />
        </>
        :
        <About />}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  menuBar: {
    paddingBottom: 120
  },
})
