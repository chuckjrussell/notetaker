import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import {CreateResponsiveStyle, DEVICE_SIZES} from 'rn-responsive-styles';
import {ThemeProvider} from '@ui-library/context/ThemeProvider';
import {Navigation} from './Navigation';

function App(): React.JSX.Element {
  const [menuIsShowing, setMenuIsShowing] = useState(false);

  const styles = useStyles();

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <Navigation />
        {/* {menuIsShowing && (
            <NoteMenuScreen onClose={() => setMenuIsShowing(false)} />
          )} */}
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
      height: '100%',
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
