import {useState} from 'react';
import {Button, MarkdownView, ScreenHeader, Typography} from '../../ui-library';
import {StyleSheet, TextInput, View} from 'react-native';
import {Edit, Menu, Save} from 'react-native-feather';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation';
import {RouteProp} from '@react-navigation/native';

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

interface NoteScreenProps {
  onMenuPressed?: () => void;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Note'>;
  route: RouteProp<RootStackParamList, 'Note'>;
}

export const NoteScreen = ({
  onMenuPressed,
  navigation,
  route,
}: NoteScreenProps) => {
  const [note, setNote] = useState(initialNote);
  const [isEditing, setIsEditing] = useState(false);

  const {id} = route.params;

  const saveNote = () => {
    setIsEditing(false);
  };

  const editNode = () => {
    setIsEditing(true);
  };

  return (
    <>
      <ScreenHeader
        leftButton={{
          onPress: () => onMenuPressed && onMenuPressed(),
          children: <Menu style={{height: 20}} />,
        }}
        headerText={`Note ${id}`}
        rightButton={
          isEditing
            ? {
                onPress: () => saveNote(),
                children: <Save style={{height: 20}} />,
              }
            : {
                onPress: () => editNode(),
                children: <Edit style={{height: 20}} />,
              }
        }
      />
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
