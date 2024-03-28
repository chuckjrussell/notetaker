import {CreateThemedStyle} from '@ui-library/context/theme';
import {ScrollView} from 'react-native';

/**
 * We need to use a different ScreenWrapper in native than web thanks to some
 * delightful web/native flex fun
 * @param children
 * @returns
 */
export const ScreenWrapper = ({children}: {children: React.ReactNode}) => {
  const styles = themedStyles();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
      {children}
    </ScrollView>
  );
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    container: {
      padding: 12,
      paddingBottom: 8,
      backgroundColor: theme.palette.gray.dark,
      flexGrow: 1,
    },
  },
}));
