import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { PublisherInList } from './publisher-in-list';

const keyExtractor = ({ _id }) => _id;

export const Publishers = (props) => {
  const { publishers } = props;

  const renderItem = useCallback(
    ({ item }) => <PublisherInList publisher={item} />,
    [],
  );

  return (
    <FlatList
      data={publishers}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.wrapper}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: { paddingVertical: 10 },
});
