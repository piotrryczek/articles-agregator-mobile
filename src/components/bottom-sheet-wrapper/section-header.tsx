import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { FONT_FAMILY_HEADER } from 'styles';

export const SectionHeader = (props) => {
  const { section } = props;

  const { title, index } = section;

  if (index === 0) {
    return null;
  }

  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    marginTop: 12,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 22,
    fontFamily: FONT_FAMILY_HEADER,
  },
});
