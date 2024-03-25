import {ScrollView, View} from 'react-native';
import {DEVICE_SIZES, minSize, useSizeRender} from 'rn-responsive-styles';
import {PanelFooterButton} from './PanelFooterButton';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {Panel} from './Panel';
import {EditableMarkdownView} from '@ui-library/molecules';
import {Button, Typography} from '@ui-library/atoms';
import {SessionContentsModel, SessionModel} from 'firebase/firestoreTypes';
import {useEffect, useState} from 'react';
import firestore from '../../firebase/firestore';
import {Icon} from '@ui-library/atoms/Icon';

type SessionNotesPanelProps = {
  campaignId?: string;
  onNotesPress: () => void;
};

export const SessionNotesPanel = ({
  campaignId,
  onNotesPress,
}: SessionNotesPanelProps) => {
  const [currentSession, setCurrentSession] = useState<SessionModel>();
  const [currentSessionContents, setCurrentSessionContents] =
    useState<SessionContentsModel>();
  const [allSessions, setAllSessions] = useState<SessionModel[]>([]);
  useEffect(() => {
    if (!campaignId) {
      return;
    }
    return firestore.getSessionsSubscription(campaignId, allSess =>
      setAllSessions(allSess),
    );
  }, [campaignId, setAllSessions]);

  useEffect(() => {
    if (!campaignId) {
      console.log('no current session set');
      return;
    }
    return firestore.getLatestSessionSubscription(campaignId, latestSession => {
      console.log('Setting current session', JSON.stringify(latestSession));
      setCurrentSession(latestSession);
    });
  }, [campaignId, setCurrentSession]);

  useEffect(() => {
    if (!currentSession || !campaignId) {
      console.log('no current session set');
      return;
    }
    return firestore.getSessionContentSubscription(
      campaignId,
      currentSession.id,
      latestSessionContents => {
        setCurrentSessionContents(latestSessionContents);
      },
    );
  }, [campaignId, currentSession, setCurrentSessionContents]);

  const styles = themedStyles();
  const {isSmallerThan} = useSizeRender();

  if (!campaignId) {
    return (
      <Panel isContent>
        <View style={{flexGrow: 1}}>
          <Typography variant="paragraph">No Campaign Set</Typography>
        </View>
      </Panel>
    );
  }

  return (
    <Panel isContent>
      <View style={{flexGrow: 1}}>
        {currentSession ? (
          <>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Typography variant="heading2">{currentSession.title}</Typography>
              <Button
                variant="primary"
                text="+"
                onPress={() => {
                  firestore.createSession(campaignId, {
                    title: `Session ${allSessions.length + 1}`, //+1 to offset array index.
                  });
                }}></Button>
            </View>
            <ScrollView
              style={{
                margin: 20,
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 'auto',
                height: 0,
              }}>
              <EditableMarkdownView
                contents={currentSessionContents?.contents}
                onContentsChanged={newText => {
                  if (currentSessionContents) {
                    firestore.updateSessionContent(
                      campaignId,
                      currentSession.id,
                      {
                        ...currentSessionContents,
                        contents: newText,
                      },
                    );
                  } else {
                    firestore.createSessionContent(
                      campaignId,
                      currentSession.id,
                      {
                        contents: newText,
                      },
                    );
                  }
                }}
              />
            </ScrollView>
          </>
        ) : (
          <>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Typography variant="heading2">Session Notes</Typography>
              <Button
                variant="primary"
                text="+"
                onPress={() => {
                  firestore.createSession(campaignId, {
                    title: `Session ${allSessions.length + 1}`, //+1 to offset array index.
                  });
                }}></Button>
            </View>
            <Icon iconType="spellBook" style={styles.noNoteSelectedIcon} />
          </>
        )}
      </View>
      {isSmallerThan(DEVICE_SIZES.XL) && (
        <PanelFooterButton text="Switch to Note" onPress={onNotesPress} />
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
