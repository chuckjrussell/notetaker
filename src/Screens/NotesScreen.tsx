import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../NavigationTypes';
import {Button, ScreenWrapper, Typography} from '@ui-library/atoms';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase/firebase.config';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {DEVICE_SIZES, minSize, useSizeRender} from 'rn-responsive-styles';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {ScreenHeaderFilters} from '@ui-library/organisms/ScreenHeaderFilter';
import {EditableMarkdownView} from '@ui-library/molecules';
import {initialNote} from '../mocks/data';
import {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {Icon} from '@ui-library/atoms/Icon';
import firestore from '../firebase/firestore';
import {useUserProvider} from '../firebase/UserProvider';
import {NoteModel} from '../firebase/firestoreTypes';
import {EditableTextField} from '@ui-library/molecules/EditableTextField';

interface NotesScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Notes'>;
  route: RouteProp<RootStackParamList, 'Notes'>;
}

export const HorizontalRule = () => {
  const styles = themedStyles();
  return <View style={styles.horizontalRule}></View>;
};

export const NotesScreen = ({navigation, route}: NotesScreenProps) => {
  const styles = themedStyles();
  const {isSmallerThan, isLargerThan, isSize} = useSizeRender();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [allNotes, setAllNotes] = useState<NoteModel[]>([]);
  const {userData} = useUserProvider();

  const {noteId: selectedNoteId, campaignId: selectedCampaignId} =
    route.params || {}; //sad that I need to do this :(

  ///THIS IS JUST DEMO WHILE I DON'T HAVE A CAMPAIGN SELECTION SCREEN
  useEffect(() => {
    if (userData) {
      firestore.getCampaigns(userData.id).then(data => {
        if (data.length > 0) {
          navigation.setParams({campaignId: data[0].id});
        }
      });
    }
  }, [userData]);

  useEffect(() => {
    if (!selectedCampaignId) return;
    const unsub = firestore.getNotesSubscription(selectedCampaignId, notes => {
      setAllNotes(notes);
      console.log('Update to notes ', JSON.stringify(notes, null, 2));
    });
    return unsub;
  }, [selectedCampaignId]);

  const selectedNote = allNotes.find(n => n.id === selectedNoteId) || undefined;

  const showNotesPanel =
    (isSmallerThan(DEVICE_SIZES.XL) && !isSessionActive) ||
    isSize(DEVICE_SIZES.XL);
  const showSessionPanel =
    (isSmallerThan(DEVICE_SIZES.XL) && isSessionActive) ||
    isSize(DEVICE_SIZES.XL);

  return (
    <ScreenWrapper>
      <ScreenHeaderFilters
        tags={['Character', 'Item', 'Location']}
        onSignout={() => {
          signOut(auth);
        }}
      />
      <View style={styles.pageWrapper}>
        {isLargerThan(DEVICE_SIZES.MD) && (
          <View style={[styles.panel]}>
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
                    console.log(`navigation to: noteId: ${note.item.id}`);
                    // navigation.push('Notes', {
                    //   noteId: note.item.id,
                    // });
                    navigation.setParams({
                      noteId: note.item.id,
                    });
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
            {/* TODO: Delete this when the note creation is finished */}
            <Button
              text="Add Demo Note"
              variant="primary"
              style={{
                marginBottom: 20,
                alignSelf: 'center',
              }}
              onPress={() => {
                //Add a demo note to the database.
                if (selectedCampaignId) {
                  firestore.createNote(selectedCampaignId, {
                    title: 'New Note',
                    type: 'Note',
                    snippet: '',
                  });
                }
              }}
            />
          </View>
        )}
        {/* Active Notes Panel: Should NOT render if there is no content (no selected id) 
          Also should not render if its in two panel layout and not active
        */}
        {showNotesPanel && (
          <View style={[styles.panel, styles.contentPanel]}>
            <View style={{flexGrow: 1}}>
              {selectedNote && selectedCampaignId ? (
                <>
                  <EditableTextField
                    style={{paddingHorizontal: 20, marginBottom: 20}}
                    variant="heading2"
                    initialText={selectedNote.title || '(untitled)'}
                    onTextChanged={newText => {
                      firestore.updateNote(selectedCampaignId, {
                        ...selectedNote,
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
              <Button
                onPress={() => setIsSessionActive(true)}
                style={{
                  marginBottom: 20,
                  alignSelf: 'center',
                }}
                variant="primary"
                text="Switch to session"
              />
            )}
          </View>
        )}

        {/* Session Notes Panel */}

        {showSessionPanel && (
          <View style={[styles.panel, styles.contentPanel]}>
            <View style={{flexGrow: 1}}>
              <Typography
                style={{paddingHorizontal: 20, marginBottom: 20}}
                variant="heading2">
                Session Notes
              </Typography>
              <View style={{margin: 20}}>
                <EditableMarkdownView initialMarkdown={initialNote} />
              </View>
            </View>
            {isSmallerThan(DEVICE_SIZES.XL) && (
              <Button
                onPress={() => setIsSessionActive(false)}
                style={{
                  marginBottom: 20,
                  alignSelf: 'center',
                }}
                variant="primary"
                text="Switch to note"
              />
            )}
          </View>
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
    panel: {
      backgroundColor: theme.palette.gray.medium,
      borderRadius: theme.borders.radius,
      width: '100%',
      paddingVertical: 20,
      marginVertical: theme.panel.marginVertical,
    },
    contentPanel: {},
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
      panel: {
        width: '32%',
      },
      note: {
        width: '100%',
      },
    },
    [DEVICE_SIZES.LG]: {
      panel: {
        width: '32%',
      },
      contentPanel: {
        width: '64%',
      },
      note: {
        width: '100%',
      },
    },
  },
}));
