import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../../theme";
import * as ImagePicker from "expo-image-picker";
import ProfileField from "./ProfileField";
import { Button } from "native-base";

const GeneralContent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [username, setUsername] = useState("saqib");
  const [email, setEmail] = useState("saqib@gmail.com");
  const [password, setPassword] = useState("asdasdasd");
  const handleSave = (label) => {
    if (label == "Username") console.log(username);
    else if (label == "Email") console.log(email);
    else if (label == "Password") console.log(password);
  };

  useEffect(() => {
    (async () => {
      if (selectedImage) {
        // Check if the initial profile photo exists, and if so, load it.
        setSelectedImage(selectedImage);
      } else {
        // Request permission to access the image gallery on mount.
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access image gallery denied!");
        }
      }
    })();
  }, [selectedImage]);

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={[styles.profilePhotoContainer]}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.profilePhoto} />
        ) : (
          <MaterialCommunityIcons
            name="account-circle"
            size={100}
            color="grey"
          />
        )}

        <Button onPress={handleImagePicker} size="sm" variant="outline">
          Change Photo
        </Button>
      </View>
      <View style={styles.form}>
        <ProfileField
          label="Username"
          value={username}
          onChangeText={setUsername}
          onSave={handleSave}
        />
        <ProfileField
          label="Email"
          value={email}
          onChangeText={setEmail}
          onSave={handleSave}
        />
        <ProfileField
          label="Password"
          value={password}
          onChangeText={setPassword}
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
  },
  profilePhotoContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  form: {
    paddingHorizontal: 20,
    width: "100%",
  },
  changePhotoButton: {
    marginTop: 10,
    backgroundColor: theme.colors.primary, // Use the primary color from the theme
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default GeneralContent;
