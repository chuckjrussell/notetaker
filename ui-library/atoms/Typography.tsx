import {StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import type {PropsWithChildren} from 'react';
import {CreateThemedStyle} from '@ui-library/context/theme';

type TypographyVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'paragraph';

type TypographyProps = PropsWithChildren<{
  style?: StyleProp<TextStyle>;
  variant: TypographyVariant;
}>;

export const Typography = (props: TypographyProps) => {
  const textStyles = themedStyles();

  const getStyle = () => {
    switch (props.variant) {
      case 'heading1':
        return textStyles.heading1;
      case 'heading2':
        return textStyles.heading2;
      case 'heading3':
        return textStyles.heading3;
      case 'heading4':
        return textStyles.heading3;
      case 'paragraph':
        return textStyles.paragraph;
    }
  };
  return <Text style={[getStyle(), props.style]}>{props.children}</Text>;
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    heading1: {
      fontSize: 32,
      lineHeight: 48,
      fontFamily: 'Rubik-Bold',
      color: theme.palette.white,
    },
    heading2: {
      fontSize: 24,
      lineHeight: 36,
      fontFamily: 'Rubik-SemiBold',
      color: theme.palette.white,
    },
    heading3: {
      fontSize: 20,
      lineHeight: 30,
      fontFamily: 'Rubik-Medium',
      color: theme.palette.white,
    },
    heading4: {
      fontSize: 16,
      lineHeight: 30,
      fontFamily: 'Rubik-Medium',
      color: theme.palette.white,
    },
    paragraph: {
      fontSize: 16,
      fontFamily: 'Rubik-Regular',
      color: theme.palette.white,
    },
  },
}));
