import {HorizontalRule, Typography} from '@ui-library/atoms';
import {Panel} from './Panel';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {PanelFooterButton} from './PanelFooterButton';
import firestore from '../../firebase/firestore';
import {NoteModel} from 'firebase/firestoreTypes';
import {useEffect, useState} from 'react';
import {DEVICE_SIZES, minSize} from 'rn-responsive-styles';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {ScrollView} from 'react-native-gesture-handler';

type NoteSelectionPanelType = {
  campaignId: string;
  selectedNoteId?: string;
  onNoteCreated: (newNote: NoteModel) => void;
  onSelectedNoteChanged: (selectedNote: NoteModel) => void;
};

export const NoteSelectionPanel = ({
  campaignId,
  selectedNoteId,
  onNoteCreated,
  onSelectedNoteChanged,
}: NoteSelectionPanelType) => {
  const [allNotes, setAllNotes] = useState<NoteModel[]>([]);
  const styles = themedStyles();

  useEffect(() => {
    const unsub = firestore.getNotesSubscription(campaignId, notes => {
      setAllNotes(notes);
    });
    return unsub;
  }, [campaignId]);

  return (
    <Panel>
      <View style={{flexGrow: 1}}>
        <Typography style={{paddingHorizontal: 20}} variant="heading2">
          Notes
        </Typography>
        <View
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 'auto',
            height: 0,
          }}>
          <FlatList
            style={styles.noteList}
            data={allNotes}
            renderItem={note => (
              <TouchableOpacity
                onPress={() => {
                  onSelectedNoteChanged(note.item);
                }}
                style={[
                  styles.note,
                  ...(note.item.id === selectedNoteId
                    ? [styles.selectedNote]
                    : []),
                ]}
                key={note.item.id}>
                <Typography style={{marginLeft: 20}} variant="paragraph">
                  {note.item.title}
                </Typography>
                <Typography style={{marginRight: 20}} variant="paragraph">
                  {note.item.type}
                </Typography>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={HorizontalRule}
          />
        </View>
        {/* TODO: Delete this when the note creation is finished */}
        <PanelFooterButton
          text="New Note"
          onPress={() => {
            if (campaignId) {
              firestore
                .createNote(campaignId, {
                  title: 'New Note',
                  type: 'Note',
                  snippet: '',
                })
                .then(newNote => {
                  onNoteCreated(newNote);
                });
            }
          }}
        />
      </View>
    </Panel>
  );
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    noteList: {
      flexWrap: 'wrap',
      gap: 16,
    },
    note: {
      paddingVertical: 20,
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
    },
    selectedNote: {
      backgroundColor: theme.palette.primary.medium,
    },
  },
  overrideStyles: {
    [minSize(DEVICE_SIZES.LG)]: {
      note: {
        width: '100%',
      },
    },
    [DEVICE_SIZES.LG]: {
      note: {
        width: '100%',
      },
    },
  },
}));
