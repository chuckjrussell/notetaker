import {PropsWithChildren} from 'react';
import {StyleProp, StyleSheet, View, ViewProps} from 'react-native';

type CardPropsType = PropsWithChildren<{
  style?: StyleProp<ViewProps>;
}>;

export const Card = (props: CardPropsType) => {
  return <View style={[cardStyles.card, props.style]}>{props.children}</View>;
};

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: '#E8EAEC',
    padding: 16,
  },
});
