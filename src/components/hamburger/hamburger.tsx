import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export const Hamburger = (props) => {
  const { navigation } = props;

  return (
    <Button
      onPress={() => navigation.openDrawer()}
      icon={<Icon name="menu" size={30} color="white" type="material" />}
      buttonStyle={styles.button}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    marginRight: 10,
  },
});
