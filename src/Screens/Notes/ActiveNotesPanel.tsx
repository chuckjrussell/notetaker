import {Icon} from '@ui-library/atoms/Icon';
import {EditableTextField} from '@ui-library/molecules/EditableTextField';
import firestore from '../../firebase/firestore';
import {NoteContentsModel, NoteModel} from '../../firebase/firestoreTypes';
import {View} from 'react-native';
import {DEVICE_SIZES, minSize, useSizeRender} from 'rn-responsive-styles';
import {PanelFooterButton} from './PanelFooterButton';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {Panel} from './Panel';
import {useEffect, useState} from 'react';
import {EditableMarkdownView} from '@ui-library/molecules';
import {ScrollView} from 'react-native-gesture-handler';

type ActiveNotePanelProps = {
  noteId?: string;
  campaignId?: string;
  onSessionPress: () => void;
};

export const ActiveNotePanel = ({
  noteId,
  campaignId,
  onSessionPress,
}: ActiveNotePanelProps) => {
  const [note, setNote] = useState<NoteModel>();
  const [noteContents, setNoteContents] = useState<NoteContentsModel>();
  const [notes, setNotes] = useState<NoteModel[]>();
  useEffect(() => {
    if (!campaignId || !noteId) {
      return;
    }
    return firestore.getNoteSubscription(campaignId, noteId, updatedNote => {
      setNote(updatedNote);
    });
  }, [campaignId, noteId, setNote]);

  useEffect(() => {
    if (!campaignId || !noteId) {
      return;
    }
    return firestore.getNotesSubscription(campaignId, updatedNotes => {
      setNotes(updatedNotes);
    });
  }, [campaignId, noteId, setNotes]);

  useEffect(() => {
    if (!campaignId || !noteId) {
      return;
    }
    return firestore.getNoteContentSubscription(
      campaignId,
      noteId,
      noteContents => {
        setNoteContents(noteContents);
      },
    );
  }, [campaignId, noteId, setNoteContents]);

  const styles = themedStyles();
  const {isSmallerThan} = useSizeRender();
  return (
    <Panel isContent>
      <View style={{flexGrow: 1}}>
        {note && campaignId && noteId ? (
          <>
            <EditableTextField
              style={{paddingHorizontal: 20}}
              variant="heading2"
              initialText={note.title || '(untitled)'}
              onTextChanged={newText => {
                firestore.updateNote(campaignId, {
                  ...note,
                  title: newText,
                });
              }}
            />
            <ScrollView
              style={{
                margin: 20,
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 'auto',
                height: 0,
              }}>
              <EditableMarkdownView
                contents={noteContents?.contents}
                onContentsChanged={newText => {
                  if (noteContents) {
                    firestore.updateNoteContent(campaignId, noteId, {
                      ...noteContents,
                      contents: newText,
                    });
                  } else {
                    firestore.createNoteContent(campaignId, noteId, {
                      contents: newText,
                    });
                  }
                }}
                linkMap={
                  notes
                    ? notes.map(n => ({
                        name: n.title || '',
                        id: n.id,
                      }))
                    : []
                }
              />
            </ScrollView>
          </>
        ) : (
          <Icon iconType="spellBook" style={styles.noNoteSelectedIcon} />
        )}
      </View>
      {isSmallerThan(DEVICE_SIZES.XL) && (
        <PanelFooterButton onPress={onSessionPress} text="Switch to Session" />
      )}
    </Panel>
  );
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    pageWrapper: {
      flexDirection: 'row',
      gap: theme.panel.gap,
      flexGrow: 1,
    },
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
    horizontalRule: {
      height: 1,
      width: '100%',
      backgroundColor: theme.palette.gray.light,
    },
    noNoteSelectedIcon: {
      width: '60%',
      margin: 'auto',
      color: theme.palette.gray.light,
      alignSelf: 'center',
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
