import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Handle = () => (
  <View style={styles.panelHandleWrapper}>
    <View style={styles.panelHandle} />
  </View>
);

const styles = StyleSheet.create({
  panelHandleWrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 40,
  },
  panelHandle: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
  },
});
