import {
  TextInput as RNTextInput,
  TextInputProps as RNInputProps,
  StyleSheet,
  View,
  StyleProp,
  TextStyle,
} from 'react-native';
import {Typography} from '.';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {useThemeProvider} from '@ui-library/context/ThemeProvider';

type TextInputProps = {
  variant?: 'form-field';
} & RNInputProps;

export const TextInput = (props: TextInputProps) => {
  const styles = themedStyles();
  const {theme} = useThemeProvider();
  const {variant, style: styleProps, ...rest} = props;
  const inputStyles: StyleProp<TextStyle> = [styles.inputField];
  if (variant === 'form-field') {
    inputStyles.push(styles.formField);
  }
  return (
    <RNTextInput
      style={[...inputStyles, props.style]}
      placeholderTextColor={theme.palette.gray.veryLight}
      {...rest}
    />
  );
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    inputField: {
      backgroundColor: theme.palette.gray.dark,
      color: theme.palette.white,
      borderRadius: theme.borders.radius,
      borderColor: theme.palette.gray.light,
      borderStyle: 'solid',
      borderWidth: 2,
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    formField: {
      marginBottom: 24,
    },
  },
}));
