import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';

import useBottomSheet from 'lib/hooks/use-bottom-sheet';

import { Handle } from './handle';
import { SectionHeader } from './section-header';
import { SectionItem } from './section-item';

const windowHeight = Dimensions.get('window').height;

const keyExtractor = ({ id }) => id;

export const BottomSheetWrapper = (props) => {
  const { articlesGroups } = props;
  const bottomSheetRef = useRef(null);

  const { setBottomSheetRef } = useBottomSheet();

  useEffect(() => {
    setBottomSheetRef(bottomSheetRef);
  }, []);

  return (
    <ScrollBottomSheet
      componentType="SectionList"
      snapPoints={[0, windowHeight]}
      initialSnapIndex={1}
      renderHandle={Handle}
      sections={articlesGroups}
      keyExtractor={keyExtractor}
      renderSectionHeader={SectionHeader}
      renderItem={SectionItem}
      contentContainerStyle={styles.contentContainerStyle}
      ref={bottomSheetRef}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: 'white',
  },
});
