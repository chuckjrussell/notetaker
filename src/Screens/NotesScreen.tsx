import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Navigation/NavigationTypes';
import {ScreenWrapper, Typography} from '@ui-library/atoms';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase/firebase.config';
import {View} from 'react-native';
import {DEVICE_SIZES, minSize, useSizeRender} from 'rn-responsive-styles';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {ScreenHeaderFilters} from '@ui-library/organisms/ScreenHeaderFilter';
import {EditableMarkdownView} from '@ui-library/molecules';
import {initialNote} from '../mocks/data';
import {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import firestore from '../firebase/firestore';
import {useUserProvider} from '../context/UserProvider';
import {NoteModel} from '../firebase/firestoreTypes';
import {ActiveNotePanel} from './Notes/ActiveNotesPanel';
import {PanelFooterButton} from './Notes/PanelFooterButton';
import {Panel} from './Notes/Panel';
import {NoteSelectionPanel} from './Notes/NoteSelectionPanel';

interface NotesScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Notes'>;
  route: RouteProp<RootStackParamList, 'Notes'>;
}

export const NotesScreen = ({navigation, route}: NotesScreenProps) => {
  const styles = themedStyles();
  const {isSmallerThan, isLargerThan, isSize} = useSizeRender();
  const [isSessionActive, setIsSessionActive] = useState(false);

  const {noteId: selectedNoteId, campaignId: selectedCampaignId} =
    route.params || {}; //sad that I need to do this :(

  const showNotesPanel =
    (isSmallerThan(DEVICE_SIZES.XL) && !isSessionActive) ||
    isSize(DEVICE_SIZES.XL);
  const showSessionPanel =
    (isSmallerThan(DEVICE_SIZES.XL) && isSessionActive) ||
    isSize(DEVICE_SIZES.XL);
  if (!selectedCampaignId)
    return <Typography variant="heading1">No Campaign</Typography>;

  return (
    <ScreenWrapper>
      <ScreenHeaderFilters
        tags={['Character', 'Item', 'Location']}
        onSignout={() => {
          signOut(auth);
        }}
      />
      <View style={styles.pageWrapper}>
        {isLargerThan(DEVICE_SIZES.MD) ? (
          <NoteSelectionPanel
            onNoteCreated={newNote => {
              navigation.setParams({
                noteId: newNote.id,
              });
            }}
            onSelectedNoteChanged={selectedNote => {
              navigation.setParams({
                noteId: selectedNote.id,
              });
            }}
            selectedNoteId={selectedNoteId}
            campaignId={selectedCampaignId}
          />
        ) : null}
        {/* Active Notes Panel: Should NOT render if there is no content (no selected id) 
          Also should not render if its in two panel layout and not active
        */}
        {showNotesPanel && (
          <ActiveNotePanel
            noteId={selectedNoteId}
            campaignId={selectedCampaignId}
            onSessionPress={() => setIsSessionActive(true)}
          />
        )}

        {/* Session Notes Panel */}

        {showSessionPanel && (
          <Panel isContent>
            <View style={{flexGrow: 1}}>
              <Typography
                style={{paddingHorizontal: 20, marginBottom: 20}}
                variant="heading2">
                Session Notes
              </Typography>
              <View style={{margin: 20}}>
                <EditableMarkdownView />
              </View>
            </View>
            {isSmallerThan(DEVICE_SIZES.XL) && (
              <PanelFooterButton
                text="Switch to Note"
                onPress={() => setIsSessionActive(false)}
              />
            )}
          </Panel>
        )}
      </View>
    </ScreenWrapper>
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
