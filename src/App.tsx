import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {
  NoteMenuScreen,
  NoteScreen,
  SigninScreen,
  SignupScreen,
} from '@ui-library/screens';
import {CreateResponsiveStyle, DEVICE_SIZES} from 'rn-responsive-styles';
import {ThemeProvider} from '@ui-library/context/ThemeProvider';

function App(): React.JSX.Element {
  const [menuIsShowing, setMenuIsShowing] = useState(false);

  const styles = useStyles();

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.containerItem}>
          <View style={styles.containerItem}>
            <SigninScreen />
            {/* <SignupScreen /> */}
            {/* <NoteScreen /> */}
          </View>
          {menuIsShowing && (
            <NoteMenuScreen onClose={() => setMenuIsShowing(false)} />
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const useStyles = CreateResponsiveStyle(
  {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 32,
    },
    containerItem: {
      backgroundColor: '#fff',
      paddingHorizontal: 16,
    },
    text: {
      fontSize: 30,
      color: 'white',
    },
  },
  {
    [DEVICE_SIZES.XL]: {
      container: {
        backgroundColor: '#fff',
      },
    },
    [DEVICE_SIZES.SM]: {
      container: {
        backgroundColor: '#fff',
      },
    },
  },
);

export default App;
