import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SPACE, SMALL_SPACE, FONT_FAMILY_HEADER } from 'styles';

export const Header1 = (props) => {
  const { children, noMarginTop } = props;

  return (
    <View style={[styles.wrapper, noMarginTop && { marginTop: 0 }]}>
      <Text selectable style={styles.text}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: SMALL_SPACE,
    marginBottom: SPACE,
  },
  text: {
    fontSize: 32,
    fontFamily: FONT_FAMILY_HEADER,
  },
});
