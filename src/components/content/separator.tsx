import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SPACE } from 'styles';

export const Separator = () => (
  <View style={styles.wrapper}>
    {/* <Image
      source={require('../../../assets/separator.png')}
      style={styles.image}
    /> */}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SPACE,
    height: 1,
    backgroundColor: '#e8e8e8',
  },
  image: {
    width: '90%',
    height: 40,
    opacity: 0.5,
    resizeMode: 'contain',
  },
});
