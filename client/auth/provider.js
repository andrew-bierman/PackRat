import { useRouter, useSearchParams, useSegments } from "expo-router";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const getRoutes = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    const inAuthGroup = segments[0] === "(auth)";
    const inPackSegment = segments[0] === "pack";
    const currentUrl = window.location.href;
    if (!jsonValue &&
      !inAuthGroup) {
      router.replace("/sign-in");
    }
    if (inPackSegment && jsonValue) {
      const path = currentUrl.substring(currentUrl.indexOf('/', 8) + 1); // "packs/644a8e475782a83b5e6e38c1"  
      router.replace(path)
    } else if (jsonValue && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }

  }

  React.useEffect(() => {
    getRoutes()
  }, [segments]);
}

export function ProviderAuth(props) {
  const [user, setAuth] = React.useState(null);
  const router = useRouter()

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

  useProtectedRoute();

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
    router.replace("/sign-in");
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
