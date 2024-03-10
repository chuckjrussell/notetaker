import {HorizontalRule, Typography} from '@ui-library/atoms';
import {Panel} from './Panel';
import {FlatList, TouchableOpacity} from 'react-native';
import {PanelFooterButton} from './PanelFooterButton';
import firestore from '../../firebase/firestore';
import {NoteModel} from 'firebase/firestoreTypes';
import {useEffect, useState} from 'react';
import {DEVICE_SIZES, minSize} from 'rn-responsive-styles';
import {CreateThemedStyle} from '@ui-library/context/theme';

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
      console.log('Update to notes ', JSON.stringify(notes, null, 2));
    });
    return unsub;
  }, [campaignId]);

  return (
    <Panel>
      <Typography
        style={{paddingHorizontal: 20, marginBottom: 20}}
        variant="heading2">
        Notes
      </Typography>
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
              ...(note.item.id === selectedNoteId ? [styles.selectedNote] : []),
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
      {/* TODO: Delete this when the note creation is finished */}
      <PanelFooterButton
        text="Add Demo Note"
        onPress={() => {
          //Add a demo note to the database.
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
