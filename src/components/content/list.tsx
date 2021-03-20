import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  SPACE,
  LINE_HEIGHT,
  SMALL_SPACE,
  FONT_FAMILY_TEXT,
  PARAGRAPH_FONT_SIZE,
} from 'styles';

export const List = (props) => {
  const { items } = props;

  return (
    <View style={styles.wrapper}>
      {items.map((itemText, index) => (
        <View
          style={[styles.item, index === items.length - 1 && styles.lastItem]}
          key={index}>
          <View style={styles.dot} />
          <Text selectable style={styles.itemText}>
            {itemText}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACE,
  },
  item: {
    marginBottom: SMALL_SPACE,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  lastItem: {
    marginBottom: 0,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 1000,
    backgroundColor: 'black',
    marginRight: SPACE,
    marginTop: 8,
  },
  itemText: {
    fontSize: PARAGRAPH_FONT_SIZE,
    fontFamily: FONT_FAMILY_TEXT,
    lineHeight: LINE_HEIGHT,
    flex: 1,
  },
});
