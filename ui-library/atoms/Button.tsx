import {PropsWithChildren} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type ButtonProps = PropsWithChildren<{
  text?: string;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}>;

export const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[props.style, baseStyles.button]}
      onPress={() => props.onPress && props.onPress()}>
      {props.text && <Text style={baseStyles.buttonText}>{props.text}</Text>}
      {props.children}
    </TouchableOpacity>
  );
};

const baseStyles = StyleSheet.create({
  button: {
    fontSize: 32,
    backgroundColor: '#E8E8E9',
    padding: 12,
    borderRadius: 16,
  },
  buttonText: {
    color: '#FAD18A',
    margin: 'auto',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
