import {CreateThemedStyle} from '@ui-library/context/theme';
import {View} from 'react-native';

export const HorizontalRule = () => {
  const styles = themedStyles();
  return <View style={styles.horizontalRule}></View>;
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    horizontalRule: {
      height: 1,
      width: '100%',
      backgroundColor: theme.palette.gray.light,
    },
  },
}));
