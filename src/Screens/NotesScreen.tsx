import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Navigation/NavigationTypes';
import {Button, ScreenWrapper, Typography} from '@ui-library/atoms';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase/firebase.config';
import {View} from 'react-native';
import {DEVICE_SIZES, minSize, useSizeRender} from 'rn-responsive-styles';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {ScreenHeaderFilters} from '@ui-library/organisms/ScreenHeaderFilter';
import {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {ActiveNotePanel} from './Notes/ActiveNotesPanel';
import {NoteSelectionPanel} from './Notes/NoteSelectionPanel';
import {Drawer} from 'react-native-drawer-layout';
import {SessionNotesPanel} from './Notes/SessionNotesPanel';

interface NotesScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Notes'>;
  route: RouteProp<RootStackParamList, 'Notes'>;
}

export const NotesScreen = ({navigation, route}: NotesScreenProps) => {
  const styles = themedStyles();
  const {isSmallerThan, isLargerThan, isSize} = useSizeRender();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [open, setOpen] = useState(false);

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
    <Drawer
      open={open}
      drawerStyle={styles.drawerStyle}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      overlayStyle={{backgroundColor: 'transparent'}}
      renderDrawerContent={() => {
        return (
          <View style={styles.drawerWrapper}>
            <Button
              variant="secondary"
              text="Close"
              onPress={() => setOpen(false)}></Button>
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
                setOpen(false);
              }}
              selectedNoteId={selectedNoteId}
              campaignId={selectedCampaignId}
            />
          </View>
        );
      }}>
      <ScreenWrapper>
        <ScreenHeaderFilters
          tags={['Character', 'Item', 'Location']}
          onMenuPressed={() => {
            setOpen(true);
          }}
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
            <SessionNotesPanel
              campaignId={selectedCampaignId}
              onNotesPress={() => setIsSessionActive(false)}
            />
          )}
        </View>
      </ScreenWrapper>
    </Drawer>
  );
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    drawerStyle: {
      backgroundColor: theme.application.backgroundColor,
      width: '100%',
      padding: theme.application.padding.default,
    },
    drawerWrapper: {
      flexGrow: 1,
    },
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
    [DEVICE_SIZES.XS]: {
      drawerStyle: {
        padding: theme.application.padding.xs,
      },
    },
  },
}));
