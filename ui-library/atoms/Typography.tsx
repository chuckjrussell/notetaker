import {StyleSheet, Text, ViewStyle} from 'react-native';
import type {PropsWithChildren} from 'react';

type TypographyVariant = 'heading1' | 'heading2' | 'heading3' | 'paragraph';

type TypographyProps = PropsWithChildren<{
  style?: ViewStyle;
  variant: TypographyVariant;
}>;

export const Typography = (props: TypographyProps) => {
  const getStyle = () => {
    switch (props.variant) {
      case 'heading1':
        return textStyles.heading1;
      case 'heading2':
        return textStyles.heading2;
      case 'heading3':
        return textStyles.heading3;
      case 'paragraph':
        return textStyles.paragraph;
    }
  };
  return <Text style={[getStyle(), props.style]}>{props.children}</Text>;
};

export const textStyles = StyleSheet.create({
  heading1: {
    fontSize: 32,
    lineHeight: 48,
    fontFamily: 'Rubik-Bold',
  },
  heading2: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Rubik-SemiBold',
  },
  heading3: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: 'Rubik-Medium',
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
  },
});
