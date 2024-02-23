import {CreateThemedStyle} from '@ui-library/context/theme';
import {ScrollView, StyleSheet, View} from 'react-native';

export const ScreenWrapper = ({children}: {children: React.ReactNode}) => {
  const styles = themedStyles();

  // return <ScrollView style={styles.container}>{children}</ScrollView>;
  return <View style={styles.container}>{children}</View>;
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    container: {
      padding: 32,
      backgroundColor: theme.palette.gray.dark,
      flexGrow: 1,
    },
  },
}));
