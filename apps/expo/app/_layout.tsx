import { Provider } from 'app/provider';
import { Stack } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { useState, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function HomeLayout() {
  
  const [authenticated, setAuthenticated] = useState(false);

 

  const checkDeviceForHardware = async () => {
      let compatible = await LocalAuthentication.hasHardwareAsync();
      console.log("compatible", compatible);
  };

  const checkForBiometrics = async () => {
      let biometricRecords = await LocalAuthentication.isEnrolledAsync();
      console.log("biometricRecords", biometricRecords);
  };

  const authenticate = async () => {
      let result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
          setAuthenticated(true);
      } else {
          Alert.alert("Authentication failed");
      }
  };

  useEffect(()=> {
    checkDeviceForHardware();
    checkForBiometrics();
    authenticate();
   }, [])




  return (
    <Provider>
    {/* <View style={styles.container}>
        <Text style={styles.heading}>
            Biometric Authentication
        </Text>
        <Button
            title={authenticated ? "Hide Content" : "Show Hidden Content"}
            onPress={() => {
                if (authenticated) {
                    setAuthenticated(false);
                    return;
                }
                checkDeviceForHardware();
                checkForBiometrics();
                authenticate();
                
            }}
        />
        {authenticated && ( */}
            <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
                
        {/* )}
            

    </View> */}
    </Provider>
);
}

// const styles = StyleSheet.create({
// container: {
//     backgroundColor: "transparent",
//     flex: 1,
//     justifyContent: "space-evenly",
//     alignItems: "center",

// },
// heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "green",
// },
// });