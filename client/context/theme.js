import { createContext, useReducer } from "react";
import { theme, darkTheme } from "../theme";
import ThirdPartyThemeProviders from "./ThirdPartyThemeProviders";

const initialState = {
  isDark: false,
  isLight: true,
  currentTheme: theme,
};
const handlers = {
  ENABLE_DARK_MODE: (state) => ({
    ...state,
    isDark: true,
    isLight: false,
    currentTheme: darkTheme,
  }),
  ENABLE_LIGHT_MODE: (state) => ({
    ...state,
    isDark: false,
    isLight: true,
    currentTheme: theme,
  }),
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

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enableDarkMode = () => {
    console.log("enableDarkMode");
    dispatch({ type: "ENABLE_DARK_MODE" });
  };
  const enableLightMode = () => {
    console.log("enableLightMode");
    dispatch({ type: "ENABLE_LIGHT_MODE" });
  };

  const key = `themeContext + isDark=${state.isDark} + isLight=${state.isLight}`;

  return (
    <ThemeContext.Provider
      key={key}
      value={{
        ...state,
        enableDarkMode,
        enableLightMode,
      }}
    >
      <ThirdPartyThemeProviders isDark={state.isDark}>
        {children}
      </ThirdPartyThemeProviders>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
