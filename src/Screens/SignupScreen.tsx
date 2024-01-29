import {TextInput, ScreenContainer, InfoPanel} from '@ui-library/atoms';
import {useState} from 'react';
import {Button, SimpleFormLayout} from '../../ui-library';
import {RootStackParamList} from '../Navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase/firebase.config';
import {getErrorMessageFromCode} from '../firebase/authErrorCodes';

interface SignupScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
}

export const SignupScreen = ({navigation}: SignupScreenProps) => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = () => {
    if (!email || !password) {
      setError('You must enter an email and password');
      return;
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(u => {
        console.log('logged in ', u);
      })
      .catch(err => {
        setError(getErrorMessageFromCode(err.code.toString()));
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return (
    <ScreenContainer>
      <SimpleFormLayout
        headerText="Sign Up"
        buttonText="Sign Up"
        onFormSubmission={handleSignup}>
        {error && <InfoPanel variant="error" text={error} />}
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
