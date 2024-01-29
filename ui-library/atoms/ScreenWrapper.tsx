import {ScrollView, StyleSheet, View} from 'react-native';

export const ScreenWrapper = ({children}: {children: React.ReactNode}) => {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
});
