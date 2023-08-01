import { createContext, useReducer, useEffect, useState } from "react";
import { theme, darkTheme } from "../theme";

const initialState = {
  isDark: false,
  isLight: true,
  currentTheme: theme,
};
const handlers = {
  ENABLE_DARK_MODE: (state) => {
    return {
      ...state,
      isDark: true,
      isLight: false,
      currentTheme: darkTheme,
    };
  },
  ENABLE_LIGHT_MODE: (state) => {
    return {
      ...state,
      isDark: false,
      isLight: true,
      currentTheme: theme,
    };
  },
};
const reducer = (state, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
};
const ThemeContext = createContext({
  ...initialState,
  platform: "JWT",
  enableDarkMode: () => Promise.resolve(),
  enableLightMode: () => Promise.resolve(),
});
export const ThemeProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const enableDarkMode = () => {
    console.log("enableDarkMode");
    dispatch({
      type: "ENABLE_DARK_MODE",
    });
  };
  const enableLightMode = () => {
    console.log("enableLightMode");
    dispatch({
      type: "ENABLE_LIGHT_MODE",
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        enableDarkMode,
        enableLightMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
