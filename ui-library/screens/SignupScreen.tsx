import {TextInput} from '@ui-library/atoms/TextInput';
import {useState} from 'react';
import {Button, SimpleFormLayout} from '..';
import {StyleSheet} from 'react-native';

export const SignupScreen = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const handleSignup = () => {
    return true;
  };

  return (
    <>
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
        />
      </SimpleFormLayout>
      <Button text="Log In" onPress={() => {}} />
    </>
  );
};
