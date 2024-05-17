import {
  type PropsWithChildren,
  createContext,
  useReducer,
  useEffect,
} from 'react';
import { getTheme } from '../theme';
import { ThemeEnum, type ThemeType } from '../theme/types';
import ThirdPartyThemeProviders from './ThirdPartyThemeProviders';
import React from 'react';
import { useStorage } from '../hooks/storage/useStorage';

const DEFAULT_THEME = ThemeEnum.LIGHT as ThemeType;

// Set default theme in initial state
const initialState = {
  isDark: DEFAULT_THEME === ThemeEnum.DARK,
  isLight: DEFAULT_THEME === ThemeEnum.LIGHT,
  currentTheme: getTheme(DEFAULT_THEME),
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
    currentTheme: getTheme(ThemeEnum.DARK),
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
    currentTheme: getTheme(ThemeEnum.LIGHT),
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
   * Initializes the app theme based on the stored theme preference.
   * If no preference is stored, sets the default theme preference in local storage.
   */
  useEffect(() => {
    if (storedTheme) {
      dispatch({ type: `ENABLE_${storedTheme}_MODE` });
    } else {
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
