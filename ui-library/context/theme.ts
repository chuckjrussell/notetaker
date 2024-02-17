import {StyleSheet} from 'react-native';
import {CreateResponsiveStyle, DEVICE_SIZES} from 'rn-responsive-styles';
import {MEDIA_QUERY} from 'rn-responsive-styles/lib/types';
import {useThemeProvider} from './ThemeProvider';

export const baseTheme = {
  borders: {
    radius: 16,
    width: 2,
  },
  palette: {
    primaryColor: {
      normal: '#A79EF1',
      light: '#rgb(245,237,255)',
    },
  },
};

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
