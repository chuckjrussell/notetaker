import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Typography} from '@ui-library'
import { MarkdownView } from '@ui-library';

const markdown = `
# MD Heading 1
## MD Heading 2
### MD Heading 3
`

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: "white",
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle && {
          paddingHorizontal: 32
        }}>
        <View
          style={{
            backgroundColor: "white",
          }}>
            <Typography variant='heading1'>Heading 1</Typography>
            <Typography variant='heading2'>Heading 2</Typography>
            <Typography variant='heading3'>Heading 3</Typography>
            <MarkdownView>{markdown}</MarkdownView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
