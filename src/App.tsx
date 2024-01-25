import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {NoteMenuScreen, NoteScreen} from '@ui-library/screens';
import {
  CreateResponsiveStyle,
  DEVICE_SIZES,
  useDeviceSize,
} from 'rn-responsive-styles';

function App(): React.JSX.Element {
  const [menuIsShowing, setMenuIsShowing] = useState(false);

  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.containerItem}>
        <View style={styles.containerItem}>
          <NoteScreen onMenuPressed={() => setMenuIsShowing(true)} />
        </View>
        {menuIsShowing && (
          <NoteMenuScreen onClose={() => setMenuIsShowing(false)} />
        )}
      </ScrollView>
    </SafeAreaView>
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
