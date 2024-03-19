import React, {useState} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';

import {CreateResponsiveStyle, DEVICE_SIZES} from 'rn-responsive-styles';
import {ThemeProvider} from '@ui-library/context/ThemeProvider';
import {Navigation} from './Navigation/Navigation';
import {UserProvider} from './context/UserProvider';
import {CreateThemedStyle, baseTheme} from '@ui-library/context/theme';

function App(): React.JSX.Element {
  const styles = useStyles();

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <UserProvider>
          <Navigation />
        </UserProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const useStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    container: {
      backgroundColor: baseTheme.palette.gray.dark,
      paddingHorizontal: theme.application.padding.default,
      flexGrow: 1,
    },
  },
}));

export default App;
