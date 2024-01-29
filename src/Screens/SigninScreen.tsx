import {TextInput} from '@ui-library/atoms/TextInput';
import {useState} from 'react';
import {
  Button,
  InfoPanel,
  ScreenContainer,
  SimpleFormLayout,
} from '../../ui-library';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase/firebase.config';
import {getErrorMessageFromCode} from '../firebase/authErrorCodes';

interface SigninScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signin'>;
}

export const SigninScreen = ({navigation}: SigninScreenProps) => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignin = () => {
    if (!email || !password) {
      setError('You must enter an email and password');
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(u => {
        console.log('logged in ', u);
      })
      .catch(err => {
        setError(getErrorMessageFromCode(err.code.toString()));
      })
      .finally(() => {
        setLoading(true);
      });
    return true;
  };

  return (
    <ScreenContainer>
      <SimpleFormLayout
        headerText="Sign In"
        buttonText="Sign In"
        onFormSubmission={handleSignin}>
        {error && <InfoPanel variant="error" text={error} />}
        <TextInput
          label="Email"
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          secureTextEntry={false}
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
