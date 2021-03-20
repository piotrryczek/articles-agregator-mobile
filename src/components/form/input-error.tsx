import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FONT_FAMILY_TEXT_REGULAR } from 'styles';

export const InputError = (props) => {
  const { error } = props;

  if (!error) {
    return null;
  }

  return (
    <View style={styles.inputError}>
      <Text style={styles.inputErrorText}>{error.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputError: {
    position: 'absolute',
    bottom: -13,
    left: 0,
    width: '100%',
  },
  inputErrorText: {
    color: 'red',
    fontSize: 10,
    fontFamily: FONT_FAMILY_TEXT_REGULAR,
  },
});
