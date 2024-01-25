import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  View,
} from 'react-native';
import {Typography} from '.';

export const TextInput = (
  props: TextInputProps & {
    label?: string;
  },
) => {
  const {style: styleProps, label, ...rest} = props;
  return (
    <View style={styles.container}>
      {label && (
        <Typography style={styles.label} variant="heading3">
          {label}
        </Typography>
      )}
      <RNTextInput style={[styles.inputField, props.style]} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    marginBottom: 8,
  },
  inputField: {
    borderRadius: 16,
    borderColor: '#E0E0E0',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 16,
  },
});
