import React from 'react';
import { View, StyleSheet } from 'react-native';

export const FormSeparator = () => {
  return (
    <View style={styles.separatorWrapper}>
      <View style={styles.separator}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  separatorWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  separator: {
    height: 2,
    backgroundColor: '#545454',
    width: '50%',
    borderRadius: 50,
  },
});
