import React, { createContext } from 'react';
import { appTheme } from '../theme';

export const ThemeContext = createContext({
  theme: appTheme,
  themeMode: 'light',
  setThemeMode: () => {},
  isDark: false,
});

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider
      value={{
        theme: appTheme,
        themeMode: 'light',
        setThemeMode: () => {},
        isDark: false,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
