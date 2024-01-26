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
  const getButtonStyle = () => {
    switch (props.variant) {
      case 'primary':
        return [baseStyles.button, baseStyles.primaryButton];
      case 'secondary':
      default:
        return [baseStyles.button, baseStyles.secondaryButton];
    }
  };
  const getTextStyle = () => {
    switch (props.variant) {
      case 'primary':
        return [baseStyles.buttonText, baseStyles.primaryButtonText];
      case 'secondary':
      default:
        return [baseStyles.buttonText, baseStyles.secondaryButtonText];
    }
  };

  return (
    <TouchableOpacity
      style={[props.style, ...getButtonStyle()]}
      onPress={() => props.onPress && props.onPress()}>
      {props.text && <Text style={getTextStyle()}>{props.text}</Text>}
      {props.children}
    </TouchableOpacity>
  );
};

const baseStyles = StyleSheet.create({
  button: {
    fontSize: 32,
    backgroundColor: '#E8E8E9',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  primaryButton: {
    backgroundColor: '#A79EF1',
  },
  secondaryButton: {
    backgroundColor: '#E8E8E9',
  },
  buttonText: {
    margin: 'auto',
    color: '#1C2D4F',
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: '#FAFAFA',
  },
  secondaryButtonText: {
    color: '#1C2D4F',
  },
});
