import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
  StyleProp,
  TextStyle,
} from 'react-native';
import {Typography} from '.';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {useThemeProvider} from '@ui-library/context/ThemeProvider';
import {forwardRef, useState} from 'react';

type TextInputProps = {
  variant?: 'form-field';
  autofill?: boolean;
} & React.ComponentProps<typeof RNTextInput>;

export const TextInput = (props: TextInputProps) => {
  const [height, setHeight] = useState(0);
  const styles = themedStyles();
  const {theme} = useThemeProvider();
  const {variant, autofill, style: styleProps, ...rest} = props;
  const inputStyles: StyleProp<TextStyle> = [styles.inputField];
  if (variant === 'form-field') {
    inputStyles.push(styles.formField);
  }

  if (autofill) {
    inputStyles.push({
      height: height,
    });
  }

  return (
    <RNTextInput
      style={[...inputStyles, props.style]}
      onContentSizeChange={event =>
        setHeight(event.nativeEvent.contentSize.height)
      }
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
