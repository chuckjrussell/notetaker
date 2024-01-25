import {View, StyleSheet} from 'react-native';
import {ScreenHeader, Typography} from '..';
import {X} from 'react-native-feather';

type NoteMenuScreenType = {
  onClose: () => void;
};

export const NoteMenuScreen = (props: NoteMenuScreenType) => {
  return (
    <View style={styles.menuContainer}>
      <ScreenHeader
        headerText="Notes"
        leftButton={{
          onPress: () => props.onClose && props.onClose(),
          children: <X style={{height: 20}} />,
        }}
      />
      <Typography variant="heading2">Recent Notes</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
});
