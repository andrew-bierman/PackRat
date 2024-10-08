import { createContext, useEffect, useReducer, useState } from 'react';
import { theme, darkTheme } from '../theme';
import ThirdPartyThemeProviders from './ThirdPartyThemeProviders';
import React from 'react';
import { useColorScheme, Platform } from 'react-native';
import { useStorageState } from 'app/hooks/storage/useStorageState';

const initialState = {
  isDark: null,
  isLight: null,
  currentTheme: theme,
  loading: true,
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
  platform: Platform.OS,
  enableDarkMode: async () => {},
  enableLightMode: async () => {},
});

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [[, storedIsEnabled], setStoredIsEnabled] = useStorageState('isEnabled');
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();

  // Fetch theme from storage and apply it
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        if (storedIsEnabled !== null) {
          const isEnabled = JSON.parse(storedIsEnabled);
          dispatch({
            type: isEnabled ? 'ENABLE_DARK_MODE' : 'ENABLE_LIGHT_MODE',
          });
        } else {
          // No preference found, default to the system color scheme
          if (colorScheme === 'dark') {
            dispatch({ type: 'ENABLE_DARK_MODE' });
          } else {
            dispatch({ type: 'ENABLE_LIGHT_MODE' });
          }
        }
      } catch (e) {
        console.error('Storage retrieval failed:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, [colorScheme, storedIsEnabled]);

  // Enable dark mode and save preference
  const enableDarkMode = () => {
    dispatch({ type: 'ENABLE_DARK_MODE' });
    setStoredIsEnabled(JSON.stringify(true));
  };

  // Enable light mode and save preference
  const enableLightMode = () => {
    dispatch({ type: 'ENABLE_LIGHT_MODE' });
    setStoredIsEnabled(JSON.stringify(false));
  };

  const key = `themeContext + isDark=${state.isDark} + isLight=${state.isLight}`;

  return loading ? null : (
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
