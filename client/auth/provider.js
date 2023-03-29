import { useRouter, useSegments } from "expo-router";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}

export function ProviderAuth(props) {
  const [user, setAuth] = React.useState(null);

  // local storage here

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    const getUser = async () => {
      const user = await getData();
      setAuth(user);
    };

    getUser();
  }, []);

  useProtectedRoute(user);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (e) {
      // saving error
    }
  };

  const signIn = (user) => {
    setAuth(user);
    storeData(user);
  };
  const signOut = () => {
    setAuth(null);
    deleteData();
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
