import {TextInput, ScreenContainer} from '@ui-library/atoms';
import {useState} from 'react';
import {Button, SimpleFormLayout} from '../../ui-library';
import {RootStackParamList} from '../Navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface SignupScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
}

export const SignupScreen = ({navigation}: SignupScreenProps) => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const handleSignup = () => {
    return true;
  };

  return (
    <ScreenContainer>
      <SimpleFormLayout
        headerText="Sign Up"
        buttonText="Sign Up"
        onFormSubmission={handleSignup}>
        <TextInput
          label="Email"
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </SimpleFormLayout>
      <Button
        text="Log In"
        onPress={() => {
          navigation.navigate('Signin');
        }}
      />
    </ScreenContainer>
  );
};
