import {
  type PropsWithChildren,
  createContext,
  useReducer,
  useEffect,
} from 'react';
import { theme, darkTheme } from '../theme';
import ThirdPartyThemeProviders from './ThirdPartyThemeProviders';
import React from 'react';
import { useStorage } from '../hooks/storage/useStorage';

enum ThemeEnum {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

type ThemeType = `${ThemeEnum}`;

const DEFAULT_THEME = ThemeEnum.DARK as ThemeType;

const initialState = {
  isDark: DEFAULT_THEME === ThemeEnum.DARK,
  isLight: DEFAULT_THEME === ThemeEnum.LIGHT,
  currentTheme: theme,
};

/**
 * Enables dark mode by updating the state object.
 *
 * @param {object} state - The current state object.
 * @return {object} The updated state object with dark mode enabled.
 */

const handlers = {
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

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [[isThemeLoading, storedTheme], setStoredTheme] = useStorage('theme');

  /**
   *  Initialize app theme based on stored theme preference or else default theme
   */
  useEffect(() => {
    if (storedTheme) {
      dispatch({ type: `ENABLE_${storedTheme}_MODE` });
    } else {
      dispatch({ type: `ENABLE_${DEFAULT_THEME}_MODE` });
      setStoredTheme(DEFAULT_THEME);
    }
  }, [isThemeLoading]);

  /**
   * Enable dark mode.
   *
   * @return {undefined} No return value.
   */
  const enableDarkMode = () => {
    dispatch({ type: 'ENABLE_DARK_MODE' });
    setStoredTheme(ThemeEnum.DARK);
  };
  /**
   * Enables light mode.
   *
   * @param {void} - This function does not take any parameters.
   * @return {void} - This function does not return any value.
   */
  const enableLightMode = () => {
    dispatch({ type: 'ENABLE_LIGHT_MODE' });
    setStoredTheme(ThemeEnum.LIGHT);
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
