import {TextInput} from '@ui-library/atoms/TextInput';
import {PropsWithChildren, useState} from 'react';
import {Button, Typography} from '..';
import {StyleSheet} from 'react-native';
import {child} from 'firebase/database';

type SimpleFormProps = PropsWithChildren<{
  headerText: string;
  buttonText: string;
  onFormSubmission?: () => void;
}>;

export const SimpleFormLayout = ({
  headerText,
  buttonText,
  onFormSubmission,
  children,
}: SimpleFormProps) => {
  const handleSubmit = () => {
    onFormSubmission && onFormSubmission();
  };

  return (
    <>
      <Typography variant="heading1" style={styles.heading}>
        {headerText}
      </Typography>
      {children}
      <Button
        onPress={handleSubmit}
        style={styles.callToAction}
        variant="primary"
        text={buttonText}
      />
    </>
  );
};

const styles = StyleSheet.create({
  heading: {marginTop: 128, marginBottom: 24},
  callToAction: {
    marginTop: 48,
  },
});
