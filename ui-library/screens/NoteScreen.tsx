import {useState} from 'react';
import {Button, MarkdownView, Typography} from '..';
import {StyleSheet, TextInput, View} from 'react-native';
import {Edit, Menu, Save} from 'react-native-feather';

const initialNote = `
# MD Heading 1
## MD Heading 2
### MD Heading 3
#### MD Heading 4

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

- Thing 1
- Thing 2

**boldtext**
`;

export const NoteScreen = () => {
  const [note, setNote] = useState(initialNote);
  const [isEditing, setIsEditing] = useState(false);

  const saveNote = () => {
    setIsEditing(false);
  };

  const editNode = () => {
    setIsEditing(true);
  };

  return (
    <>
      <View style={styles.menuContainer}>
        <Button onPress={() => {}}>
          <Menu style={{height: 20}} />
        </Button>
        <View style={styles.menuTitle}>
          <Typography variant="heading3">Note Name</Typography>
        </View>
        {isEditing ? (
          <Button onPress={() => saveNote()}>
            <Save style={{height: 20}} />
          </Button>
        ) : (
          <Button onPress={() => editNode()}>
            <Edit style={{height: 20}} />
          </Button>
        )}
      </View>
      <View>
        {isEditing ? (
          <TextInput
            multiline={true}
            numberOfLines={16}
            value={note}
            onChangeText={text => setNote(text)}
          />
        ) : (
          <MarkdownView>{note}</MarkdownView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    marginBottom: 32,
  },
  menuTitle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    width: 100,
  },
});
