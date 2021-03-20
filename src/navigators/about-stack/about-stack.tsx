import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { AboutScreen } from 'screens/about';
import { baseScreenOptions } from 'lib/header/config';

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

export const AboutStack = (props) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator
        initialRouteName="AboutStack"
        screenOptions={{
          ...baseScreenOptions({ navigation }),
        }}>
        <Screen
          name="About"
          component={AboutScreen}
          options={{ headerTitle: 'O aplikacji' }}
        />
      </Navigator>
    </SafeAreaView>
  );
};
