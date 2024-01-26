import {TextInput} from '@ui-library/atoms/TextInput';
import {useState} from 'react';
import {
  Button,
  ScreenContainer,
  SimpleFormLayout,
  Typography,
} from '../../ui-library';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation';
import {Link} from '@react-navigation/native';

interface SigninScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signin'>;
}

export const SigninScreen = ({navigation}: SigninScreenProps) => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const handleSignin = () => {
    console.log(`signing in: ${email} ${password}`);
    return true;
  };

  return (
    <ScreenContainer>
      <SimpleFormLayout
        headerText="Sign In"
        buttonText="Sign In"
        onFormSubmission={handleSignin}>
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
        text="Sign Up"
        onPress={() => {
          navigation.navigate('Signup');
        }}
      />
    </ScreenContainer>
  );
};
