import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {NoteScreen} from '@ui-library/screens';
import {
  CreateResponsiveStyle,
  DEVICE_SIZES,
  useDeviceSize,
} from 'rn-responsive-styles';

function App(): React.JSX.Element {
  const styles = useStyles();
  const deviceSize = useDeviceSize();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.containerItem}>
        <View style={styles.containerItem}>
          <NoteScreen />
        </View>
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
