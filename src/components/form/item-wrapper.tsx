import React from 'react';
import { StyleSheet, View } from 'react-native';

export const ItemWrapper = (props) => {
  const { children, button, noPaddingTop = false } = props;

  return (
    <View
      style={[
        styles.itemWrapper,
        button && styles.itemWrapperForButton,
        noPaddingTop && styles.itemWrapperNoPaddingTop,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    paddingTop: 20,
    paddingBottom: 0,
  },
  itemWrapperNoPaddingTop: {
    paddingTop: 0,
  },
  itemWrapperForButton: {
    paddingTop: 30,
  },
});
