import {StyleSheet} from 'react-native';
import {CreateResponsiveStyle, DEVICE_SIZES} from 'rn-responsive-styles';
import {MEDIA_QUERY} from 'rn-responsive-styles/lib/types';
import {useThemeProvider} from './ThemeProvider';

export const basePalette = {
  gray: {
    dark: '#161616',
    medium: '#2D2D2D',
    light: '#3F3F3F',
    veryLight: '#8C8C8C',
  },
  white: '#FFFFFF',
  primary: {
    medium: '#8E07F1',
  },
};

export const baseTheme = {
  application: {
    backgroundColor: basePalette.gray.dark,
  },
  panel: {
    backgroundColor: basePalette.gray.medium,
    marginVertical: 12,
    gap: 24,
  },
  text: {
    color: basePalette.white,
  },
  borders: {
    radius: 24,
    width: 2,
  },
  palette: basePalette,
};

export type PaletteType = typeof basePalette;
export type ThemeType = typeof baseTheme;

type ThemeInjectionType<DefaultStyles, OverrideStyles> = (theme: ThemeType) => {
  defaultStyle: DefaultStyles;
  overrideStyles?: Record<
    DEVICE_SIZES | MEDIA_QUERY,
    Partial<StyleSheet.NamedStyles<OverrideStyles>>
  >;
};

export const CreateThemedStyle = <
  DefaultStyles extends StyleSheet.NamedStyles<DefaultStyles>,
  OverrideStyles extends DefaultStyles,
>(
  styles: ThemeInjectionType<DefaultStyles, OverrideStyles>,
) => {
  return () => {
    const {theme} = useThemeProvider();
    const {defaultStyle, overrideStyles} = styles(theme);
    return CreateResponsiveStyle(defaultStyle, overrideStyles)();
  };
};
