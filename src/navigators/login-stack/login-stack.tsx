import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from 'screens/login';
import { LoginPublisherScreen } from 'screens/login-publisher';
import { baseScreenOptions } from 'lib/header/config';

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

export const LoginStack = (props) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator
        initialRouteName="LoginStack"
        screenOptions={{
          ...baseScreenOptions({ navigation }),
        }}>
        <Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTitle: 'Logowanie' }}
        />
        <Screen
          name="LoginPublisher"
          component={LoginPublisherScreen}
          options={{ headerTitle: 'Logowanie wydawcy' }}
        />
      </Navigator>
    </SafeAreaView>
  );
};
