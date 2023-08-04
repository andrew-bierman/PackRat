import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { theme } from "../../../theme";
import ProfileField from "./ProfileField";

const ItemsContent = ({}) => {
  const [weightUnits, setWeightUnits] = useState("125");
  const [weatherUnits, setWeatherUnits] = useState("hello g");

  const handleSave = (label) => {
    if (label == "Units of Weight") console.log(weightUnits);
    else if (label == "Weather Units") console.log(weatherUnits);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.form}>
        <ProfileField
          label="Units of Weight"
          value={weightUnits}
          onChangeText={setWeightUnits}
          onSave={handleSave}
        />
        <ProfileField
          label="Weather Units"
          value={weatherUnits}
          onChangeText={setWeatherUnits}
          onSave={handleSave}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  form: {
    paddingHorizontal: 20,
    width: "100%",
  },
});

export default ItemsContent;
