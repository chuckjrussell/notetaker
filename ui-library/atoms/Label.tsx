import {CreateThemedStyle} from '@ui-library/context/theme';
import {Typography} from '.';

interface LabelProps {
  label: string;
}
export const Label = ({label}: LabelProps) => {
  const styles = themedStyles();
  return (
    <Typography style={styles.label} variant="heading3">
      {label}
    </Typography>
  );
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    label: {
      marginBottom: 8,
      color: theme.palette.white,
    },
  },
}));
