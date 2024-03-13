import {TextInput} from '@ui-library/atoms/TextInput';
import {useState} from 'react';
import {
  Button,
  InfoPanel,
  Label,
  ScreenContainer,
  SimpleFormLayout,
} from '../../ui-library';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Navigation/NavigationTypes';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase/firebase.config';
import {getErrorMessageFromCode} from '../firebase/authErrorCodes';

interface SigninScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Signin'>;
}

export const SigninScreen = ({navigation}: SigninScreenProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
        <Label label="Email" />
        <TextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          secureTextEntry={false}
          autoCapitalize="none"
          variant="form-field"
        />
        <Label label="Password" />
        <TextInput
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          variant="form-field"
        />
      </SimpleFormLayout>
      <Button
        text="Sign Up"
        onPress={() => {
          navigation.navigate('Signup');
        }}
        style={{
          marginTop: 24,
        }}
      />
    </ScreenContainer>
  );
};
