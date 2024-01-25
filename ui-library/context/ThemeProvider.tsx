import {PropsWithChildren, ReactNode, createContext, useState} from 'react';
import {ThemeType, theme} from './theme';

type ThemeContextType = {
  theme?: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: theme,
  setTheme: () => {},
});

export const ThemeProvider = (
  props: PropsWithChildren<{theme?: ThemeType}>,
) => {
  const [currentTheme, setCurrentTheme] = useState(theme);
  return (
    <ThemeContext.Provider
      value={{theme: currentTheme, setTheme: setCurrentTheme}}>
      {props.children}
    </ThemeContext.Provider>
  );
};
