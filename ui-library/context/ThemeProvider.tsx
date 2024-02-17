import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import {ThemeType, baseTheme} from './theme';

type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: baseTheme,
  setTheme: () => {},
});

export const ThemeProvider = (
  props: PropsWithChildren<{theme?: ThemeType}>,
) => {
  const [currentTheme, setCurrentTheme] = useState(baseTheme);
  return (
    <ThemeContext.Provider
      value={{theme: currentTheme, setTheme: setCurrentTheme}}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useThemeProvider = () => useContext(ThemeContext);
