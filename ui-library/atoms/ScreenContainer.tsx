import {CreateThemedStyle} from '@ui-library/context/theme';
import {ReactNode} from 'react';
import {View} from 'react-native';
import {minSize, DEVICE_SIZES} from 'rn-responsive-styles';

export const ScreenContainer = ({children}: {children?: ReactNode}) => {
  const styles = themedStyles();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    outerContainer: {
      height: '100%',
    },
    container: {
      height: '100%',
      paddingHorizontal: 32,
      backgroundColor: theme.application.backgroundColor,
      flexGrow: 1,
      shadowOpacity: 100,
      shadowRadius: 20,
      shadowOffset: {
        width: 10,
        height: 0,
      },
    },
  },
  overrideStyles: {
    [minSize(DEVICE_SIZES.LG)]: {
      outerContainer: {
        paddingLeft: '45%',
        backgroundColor: theme.palette.primary.medium,
      },
      container: {
        paddingHorizontal: '20%',
      },
    },
  },
}));
