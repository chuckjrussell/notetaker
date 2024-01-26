import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SigninScreen, SignupScreen, Typography} from '@ui-library/index';
import {appConfig} from '../config';

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: [appConfig.url, appConfig.deeplinkPrefix, 'http://localhost:5173/'],
  screens: {
    Signin: 'Signin',
    Signup: 'Signup',
  },
};

export const Navigation = () => {
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
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
