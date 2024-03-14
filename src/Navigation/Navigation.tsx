import {NavigationContainer, LinkingOptions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SigninScreen, SignupScreen, NotesScreen} from '../Screens';
import {appConfig} from '../../config';
import {useUserProvider} from '../context/UserProvider';
import {RootStackParamList} from './NavigationTypes';
import {CampaignScreen} from '../Screens/Campaign/Campaign';
import createTabNavigator from './TabNavigator';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [appConfig.deeplinkPrefix],
  config: {
    initialRouteName: 'Campaign',
    screens: {
      Notes: 'Campaign/:campaignId/Notes',
      Campaign: 'Campaign',
      Signin: 'Signin',
      Signup: 'Signup',
    },
  },
};

export const Navigation = () => {
  const {loggedInUser, initialized} = useUserProvider();
  if (!initialized) return null;
  return (
    <NavigationContainer linking={linking}>
      {loggedInUser ? (
        <TabNavigator.Navigator tabBarStyle={{}} contentStyle={{}}>
          <TabNavigator.Screen name="Campaign" component={CampaignScreen} />
          <TabNavigator.Screen name="Notes" component={NotesScreen} />
        </TabNavigator.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();
const TabNavigator = createTabNavigator<RootStackParamList>();
