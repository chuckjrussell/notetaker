import {NavigationContainer, LinkingOptions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SigninScreen, SignupScreen, NotesScreen} from './Screens';
import {appConfig} from '../config';
import {useUserProvider} from './firebase/UserProvider';
import {RootStackParamList} from './NavigationTypes';
import {DemoScreen} from './Screens/DemoScreen';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [appConfig.deeplinkPrefix],
  config: {
    initialRouteName: 'Demo',
    screens: {
      Home: 'Home',
      Demo: 'Demo',
      Signin: 'Signin',
      Signup: 'Signup',
    },
  },
};

export const Navigation = () => {
  return (
    <NavigationContainer linking={linking}>
      <MainStack />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

const MainStack = () => {
  const {loggedInUser, initialized} = useUserProvider();
  if (!initialized) return null;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {loggedInUser ? (
        <>
          <Stack.Screen name="Home" component={NotesScreen} />
          <Stack.Screen name="Demo" component={DemoScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
