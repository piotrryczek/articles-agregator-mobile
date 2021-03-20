import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  BORDER_RADIUS,
  SPACE,
  ACTIVE_OPACITY,
  FONT_FAMILY_HEADER_REGULAR,
} from 'styles';

export const UrlButton = (props) => {
  const { url, label, icon, backgroundColor } = props;

  const handleGo = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      style={styles.wrapper}
      onPress={handleGo}>
      <View style={[styles.button, { backgroundColor }]}>
        <View style={styles.iconWrapper}>{icon}</View>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACE,
  },
  button: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    borderRadius: BORDER_RADIUS,
  },
  iconWrapper: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  labelWrapper: {},
  label: {
    fontFamily: FONT_FAMILY_HEADER_REGULAR,
    fontSize: 15,
    color: 'white',
  },
});
