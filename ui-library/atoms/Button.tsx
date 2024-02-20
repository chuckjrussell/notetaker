import {CreateThemedStyle} from '@ui-library/context/theme';
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
  const baseStyles = themedStyles();

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

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    button: {
      fontSize: 32,
      backgroundColor: theme.palette.gray.dark,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: theme.borders.radius,
      alignItems: 'center',
    },
    primaryButton: {
      backgroundColor: theme.palette.primary.medium,
    },
    secondaryButton: {
      backgroundColor: theme.palette.gray.dark,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: theme.palette.gray.light,
    },
    buttonText: {
      margin: 'auto',
      color: theme.palette.white,
      fontWeight: 'bold',
    },
    primaryButtonText: {
      color: theme.palette.white,
    },
    secondaryButtonText: {
      color: theme.palette.white,
    },
  },
}));
