import {Button, Typography} from '@ui-library/atoms';
import {RootStackParamList} from '../NavigationTypes';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

interface DemoScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Demo'>;
  route: RouteProp<RootStackParamList, 'Demo'>;
}

export const DemoScreen = ({navigation, route}: DemoScreenProps) => {
  console.log(JSON.stringify(route.params));
  console.log(JSON.stringify(navigation.getState(), null, 2));
  return (
    <View style={{backgroundColor: 'black'}}>
      <Typography variant="heading1">DemoScreen</Typography>
      <Typography variant="paragraph">
        {JSON.stringify(route, null, 2)}
      </Typography>
      <Button
        onPress={() => {
          navigation.navigate('Home');
        }}
        text="Go to notes"
      />
    </View>
  );
};
