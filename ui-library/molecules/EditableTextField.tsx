import {TextInput, Typography} from '@ui-library';
import {TypographyProps} from '@ui-library/atoms/Typography';
import {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

type EditableTextFieldProps = {
  initialText: string;
  onTextChanged: (newText: string) => void;
} & TypographyProps;

export const EditableTextField = ({
  style,
  variant,
  initialText,
  onTextChanged,
}: EditableTextFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(initialText);

  useEffect(() => {
    setCurrentValue(initialText);
  }, [initialText]);

  return isEditing ? (
    <TextInput
      onChangeText={newText => {
        setCurrentValue(newText);
      }}
      value={currentValue}
      onBlur={() => {
        setIsEditing(false);
        onTextChanged(currentValue);
      }}
    />
  ) : (
    <TouchableOpacity onPress={() => setIsEditing(true)}>
      <Typography variant={variant} style={style}>
        {currentValue}
      </Typography>
    </TouchableOpacity>
  );
};
