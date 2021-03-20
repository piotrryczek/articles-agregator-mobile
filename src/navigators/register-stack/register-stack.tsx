import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { RegisterScreen } from 'screens/register';
import { RegisterByEmailScreen } from 'screens/register-by-email';

import { baseScreenOptions } from 'lib/header/config';

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

export const RegisterStack = (props) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator
        initialRouteName="RegisterStack"
        screenOptions={{
          ...baseScreenOptions({ navigation }),
        }}>
        <Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTitle: 'Rejestracja',
          }}
        />

        <Screen
          name="RegisterByEmail"
          component={RegisterByEmailScreen}
          options={{ headerTitle: 'Rejestracja email' }}
        />
      </Navigator>
    </SafeAreaView>
  );
};
