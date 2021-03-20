import React from 'react';
import { View, StyleSheet } from 'react-native';

export const FormSection = (props) => {
  const {
    children,
    first = false,
    last = false,
    noSpaceBottom = false,
    noSpaceTop = false,
  } = props;

  return (
    <View
      style={[
        styles.section,
        first && styles.sectionFirst,
        last && styles.sectionLast,
        noSpaceBottom && styles.noSpaceBottom,
        noSpaceTop && styles.noSpaceTop,
      ]}>
      {children}
    </View>
  );
};

export const styles = StyleSheet.create({
  section: {
    paddingVertical: 30,
  },
  sectionFirst: {
    paddingTop: 0,
  },
  sectionLast: {
    paddingBottom: 0,
  },
  noSpaceTop: {
    paddingTop: 0,
  },
  noSpaceBottom: {
    paddingBottom: 0,
  },
});
