import {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

type CardPropsType = PropsWithChildren;

export const Card = (props: CardPropsType) => {
  return <View style={cardStyles.card}></View>;
};

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: '#E8EAEC',
  },
});
