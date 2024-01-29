import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NoteScreen, SigninScreen, SignupScreen, HomeScreen} from './Screens';
import {appConfig} from '../config';
import {useUserProvider} from './firebase/UserProvider';
import {Typography} from '@ui-library';

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  Home: undefined;
  Note: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: [appConfig.url, appConfig.deeplinkPrefix, 'http://localhost:5173/'],
  screens: {
    Signin: 'Signin',
    Signup: 'Signup',
    Home: 'Home',
    Note: 'Note',
  },
};

export const Navigation = () => {
  const {loggedInUser} = useUserProvider();

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Typography variant="heading3">Loading...</Typography>}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#fff',
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {loggedInUser ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Note" component={NoteScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
