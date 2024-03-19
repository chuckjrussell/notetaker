import {CreateThemedStyle} from '@ui-library/context/theme';
import {ScrollView, StyleSheet, View} from 'react-native';
import {DEVICE_SIZES} from 'rn-responsive-styles';
import {deviceSize} from 'rn-responsive-styles/lib/helpers';

export const ScreenWrapper = ({children}: {children: React.ReactNode}) => {
  const styles = themedStyles();

  // return <ScrollView style={styles.container}>{children}</ScrollView>;
  return <View style={styles.container}>{children}</View>;
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    container: {
      padding: theme.application.padding.default,
      backgroundColor: theme.palette.gray.dark,
      flexGrow: 1,
    },
  },
  overrideStyles: {
    [DEVICE_SIZES.XS]: {
      container: {
        padding: theme.application.padding.xs,
      },
    },
  },
}));
