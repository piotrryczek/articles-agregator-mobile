import React from 'react';
import { StyleSheet, View } from 'react-native';

export const FormWrapper = (props) => {
  const { children } = props;

  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
