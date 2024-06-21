import { createContext, useEffect, useReducer } from 'react';
import { theme, darkTheme } from '../theme';
import ThirdPartyThemeProviders from './ThirdPartyThemeProviders';
import React from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isDark: null,
  isLight: null,
  currentTheme: theme,
};
const handlers = {
  /**
   * Enables dark mode by updating the state object.
   *
   * @param {object} state - The current state object.
   * @return {object} The updated state object with dark mode enabled.
   */
  ENABLE_DARK_MODE: (state) => ({
    ...state,
    isDark: true,
    isLight: false,
    currentTheme: darkTheme,
  }),
  /**
   * Enables light mode by updating the state object.
   *
   * @param {object} state - The current state object.
   * @return {object} The updated state object with light mode enabled.
   */
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
  platform: 'JWT',
  enableDarkMode: async () => {
    await Promise.resolve();
  },
  enableLightMode: async () => {
    await Promise.resolve();
  },
});

/**
 * Creates a ThemeProvider component that wraps the provided children with a context provider for managing the theme state.
 *
 * @param {Object} props - The properties object.
 * @param {ReactNode} props.children - The children components to be wrapped.
 * @return {ReactNode} - The wrapped children components.
 */
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchTheme = async () => {
      let storedIsEnabled;
      if (Platform.OS === 'web') {
        storedIsEnabled = await localStorage.getItem('isEnabled');
      } else {
        storedIsEnabled = await AsyncStorage.getItem('isEnabled');
      }

      if (storedIsEnabled !== null) {
        const isEnabled = JSON.parse(storedIsEnabled);
        dispatch({
          type: isEnabled ? 'ENABLE_DARK_MODE' : 'ENABLE_LIGHT_MODE',
        });
      } else {
        dispatch({ type: 'ENABLE_LIGHT_MODE' });
      }
    };

    fetchTheme();
  }, []);

  /**
   * Enable dark mode.
   *
   * @return {undefined} No return value.
   */
  const enableDarkMode = () => {
    dispatch({ type: 'ENABLE_DARK_MODE' });
  };
  /**
   * Enables light mode.
   *
   * @param {void} - This function does not take any parameters.
   * @return {void} - This function does not return any value.
   */
  const enableLightMode = () => {
    dispatch({ type: 'ENABLE_LIGHT_MODE' });
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
