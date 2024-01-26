import {ReactNode} from 'react';
import {View} from 'react-native';
import {
  CreateResponsiveStyle,
  minSize,
  DEVICE_SIZES,
} from 'rn-responsive-styles';

export const ScreenContainer = ({children}: {children?: ReactNode}) => {
  const styles = useStyles();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const useStyles = CreateResponsiveStyle(
  {
    outerContainer: {
      height: '100%',
    },
    container: {
      height: '100%',
      paddingHorizontal: 32,
      backgroundColor: '#fff',
      flexGrow: 1,
      shadowOpacity: 100,
      shadowRadius: 20,
      shadowOffset: {
        width: 10,
        height: 0,
      },
    },
  },
  {
    [minSize(DEVICE_SIZES.LG)]: {
      outerContainer: {
        paddingLeft: 400,
        backgroundColor: '#rgb(245,237,255)',
      },
      container: {
        paddingHorizontal: '20%',
        backgroundColor: '#fff',
      },
    },
  },
);
