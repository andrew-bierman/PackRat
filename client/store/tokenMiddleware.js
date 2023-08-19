import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token;
  } catch (error) {
    return null;
  }
};

export const tokenMiddleware = (store) => (next) => async (action) => {
  const token = await getTokenFromStorage(); // Retrieve the token

  if (action.type.startsWith("auth/")){
    return next(action);
  }
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return next(action);
  }
};
