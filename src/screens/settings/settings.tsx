import React from 'react';
import { View, Text } from 'react-native';

export const SettingsScreen = (props) => {
  const { navigation } = props;

  return (
    <Text>Przykład</Text>
    // <SettingsStack.Navigator>
    //   <SettingsStack.Screen
    //     name="Settings"
    //     options={{
    //       title: 'Ustawienia',
    //       headerLeft: () => (
    //         <HeaderBackButton
    //           onPress={() => {
    //             navigation.goBack();
    //           }}
    //         />
    //       ),
    //     }}
    //     component={() => (
    //       <View>
    //         <Text>Ustawienia</Text>
    //       </View>
    //     )}
    //   />
    // </SettingsStack.Navigator>
  );
};
