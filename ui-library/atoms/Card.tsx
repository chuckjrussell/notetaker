import {CreateThemedStyle} from '@ui-library/context/theme';
import {PropsWithChildren} from 'react';
import {StyleProp, StyleSheet, View, ViewProps} from 'react-native';

type CardPropsType = PropsWithChildren<{
  style?: StyleProp<ViewProps>;
}>;

export const Card = (props: CardPropsType) => {
  const cardStyles = themedStyles();
  return <View style={[cardStyles.card, props.style]}>{props.children}</View>;
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    card: {
      borderRadius: theme.borders.radius,
      backgroundColor: theme.panel.backgroundColor,
      padding: 16,
    },
  },
}));
