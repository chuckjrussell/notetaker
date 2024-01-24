import {StyleSheet, Text} from 'react-native';
import type {PropsWithChildren} from 'react';

type TypographyVariant = 'heading1' | 'heading2' | 'heading3' | 'paragraph';

type TypographyProps = PropsWithChildren<{
  variant: TypographyVariant;
}>;

export const Typography = (props: TypographyProps) => {
  switch (props.variant) {
    case 'heading1':
      return <Text style={textStyles.heading1}>{props.children}</Text>;
    case 'heading2':
      return <Text style={textStyles.heading2}>{props.children}</Text>;
    case 'heading3':
      return <Text style={textStyles.heading3}>{props.children}</Text>;
    case 'paragraph':
      return <Text style={textStyles.paragraph}>{props.children}</Text>;
  }
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
