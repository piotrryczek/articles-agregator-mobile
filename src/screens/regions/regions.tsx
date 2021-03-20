import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export const RegionsScreen = (props) => {
  const { navigation } = props;

  return (
    <View>
      <Text>Regiony</Text>
      <Button onPress={() => navigation.navigate('Region')} title="Region" />
    </View>
  );
};
