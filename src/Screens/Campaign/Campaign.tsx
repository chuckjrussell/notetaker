import {
  Button,
  Card,
  ScreenWrapper,
  TextInput,
  Typography,
} from '@ui-library/atoms';
import {RootStackParamList} from '../../Navigation/NavigationTypes';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useUserProvider} from '../../context/UserProvider';
import {useEffect, useState} from 'react';
import firestore from '../../firebase/firestore';
import {CampaignModel} from '../../firebase/firestoreTypes';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {DEVICE_SIZES, maxSize} from 'rn-responsive-styles';

interface DemoScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Campaign'>;
  route: RouteProp<RootStackParamList, 'Campaign'>;
}

const AddCampaignButton = () => {
  const {userData} = useUserProvider();
  const [isCreating, setIsCreating] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState<string>();
  const styles = themedStyles();
  return (
    <Card style={styles.card}>
      {isCreating ? (
        <>
          <TextInput
            value={campaignTitle}
            onChangeText={newText => setCampaignTitle(newText)}
          />
          <Button
            variant="primary"
            onPress={() => {
              firestore.createCampaign({
                name: campaignTitle,
                createdBy: userData
                  ? {
                      ...userData,
                      userId: userData.id,
                    }
                  : undefined,
              });
            }}
            text="Create Campaign"></Button>

          <Button
            variant="secondary"
            onPress={() => setIsCreating(false)}
            text="Cancel"></Button>
        </>
      ) : (
        <>
          <Button
            variant="primary"
            text="New"
            onPress={() => setIsCreating(true)}
          />
        </>
      )}
    </Card>
  );
};

export const CampaignScreen = ({navigation, route}: DemoScreenProps) => {
  const {userData} = useUserProvider();
  const [campaigns, setCampaigns] = useState<CampaignModel[]>([]);
  const styles = themedStyles();

  useEffect(() => {
    if (userData?.id) {
      return firestore.getCampaignsSubscription(userData.id, campaigns => {
        setCampaigns(campaigns);
      });
    }
  }, [userData]);

  return (
    <ScreenWrapper>
      <Typography variant="heading1">Campaigns</Typography>
      {!userData ? (
        <Typography variant="paragraph">No user loaded</Typography>
      ) : (
        <View style={styles.cardContainer}>
          {campaigns.map(c => (
            <Card key={c.id} style={styles.card}>
              <Typography variant="heading4">{c.name}</Typography>
              <Typography variant="heading4">{c.id}</Typography>
              <Button
                variant="primary"
                onPress={() => {
                  navigation.navigate('Notes', {campaignId: c.id});
                }}
                text="Launch"></Button>
            </Card>
          ))}
          <AddCampaignButton />
        </View>
      )}
    </ScreenWrapper>
  );
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    cardContainer: {
      flexWrap: 'wrap',
      gap: 20,
    },
    card: {
      width: '19%',
      height: 300,
      justifyContent: 'space-between',
    },
  },
  overrideStyles: {
    [DEVICE_SIZES.MD]: {
      card: {
        width: '49%',
      },
    },
    [maxSize(DEVICE_SIZES.SM)]: {
      card: {
        width: '99%',
        height: 'auto',
      },
    },
  },
}));
