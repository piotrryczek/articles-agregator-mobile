import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { PublishersScreen } from 'screens/publishers';
import { PublisherScreen } from 'screens/publisher';
import { Hamburger } from 'components/hamburger';
import { baseScreenOptions } from 'lib/header/config';

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

export const PublishersStack = (props) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator
        initialRouteName="LoginStack"
        screenOptions={{
          ...baseScreenOptions({ navigation }),
          headerRight: () => <Hamburger navigation={navigation} />,
        }}>
        <Screen
          name="Publishers"
          component={PublishersScreen}
          options={{ headerTitle: 'Autorzy' }}
        />
      </Navigator>
    </SafeAreaView>
  );
};
