import {Icon} from '@ui-library/atoms/Icon';
import {EditableTextField} from '@ui-library/molecules/EditableTextField';
import firestore from '../../firebase/firestore';
import {NoteModel} from '../../firebase/firestoreTypes';
import {View} from 'react-native';
import {DEVICE_SIZES, minSize, useSizeRender} from 'rn-responsive-styles';
import {PanelFooterButton} from './PanelFooterButton';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {Panel} from './Panel';

type ActiveNotePanelProps = {
  note?: NoteModel;
  campaignId?: string;
  onSessionPress: () => void;
};

//TODO: Add Firebase Integration here for currently selected note details

export const ActiveNotePanel = ({
  note,
  campaignId,
  onSessionPress,
}: ActiveNotePanelProps) => {
  const styles = themedStyles();
  const {isSmallerThan} = useSizeRender();
  return (
    <Panel isContent>
      <View style={{flexGrow: 1}}>
        {note && campaignId ? (
          <>
            <EditableTextField
              style={{paddingHorizontal: 20, marginBottom: 20}}
              variant="heading2"
              initialText={note.title || '(untitled)'}
              onTextChanged={newText => {
                firestore.updateNote(campaignId, {
                  ...note,
                  title: newText,
                });
              }}
            />
            <View style={{margin: 20}}>
              {/* REPLACE THIS WITH SOMETHING THAT MAKES ITS OWN CALL TO FIRESTORE */}
              {/* <EditableMarkdownView
                      selectedNoteId={selectedNote.id}
                      initialMarkdown={selectedNote.content}
                    /> */}
            </View>
          </>
        ) : (
          // <></>
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
