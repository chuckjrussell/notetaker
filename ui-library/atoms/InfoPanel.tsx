import {theme} from '@ui-library/context/theme';
import {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from '.';

type InfoPanelProps = PropsWithChildren<{
  variant: 'info' | 'error' | 'success' | 'warning';
  text?: string;
}>;

export const InfoPanel = (props: InfoPanelProps) => {
  const getStyles = () => {
    switch (props.variant) {
      case 'error':
        return {box: styles.errorBox, text: styles.errorText};
      case 'success':
        return {box: styles.successBox, text: styles.successText};
      case 'warning':
        return {box: styles.warningBox, text: styles.warningText};
      case 'info':
      default:
        return {box: styles.infoBox, text: styles.infoText};
    }
  };

  return (
    <View style={[styles.box, getStyles().box]}>
      <Typography style={[styles.text, getStyles().text]} variant="paragraph">
        {props.text}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 16,
    borderRadius: theme.borders.radius,
    marginVertical: 8,
  },
  text: {},
  errorBox: {
    backgroundColor: '#DBB4B2',
    borderColor: '#AE2321',
  },
  errorText: {
    color: '#AE2321',
  },
  infoBox: {
    backgroundColor: '#CDE8F4',
    borderColor: '#B4DAEC',
  },
  infoText: {
    color: '#CDE8F4',
  },
  warningBox: {
    backgroundColor: '#F8F3D6',
    borderColor: '#EEE9CD',
  },
  warningText: {
    color: '#885F1C',
  },
  successBox: {
    backgroundColor: '#DEF1D5',
    borderColor: '#CFE2C8',
  },
  successText: {
    color: '#4F6548',
  },
});
