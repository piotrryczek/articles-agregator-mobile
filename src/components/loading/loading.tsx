import React from 'react';
import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native';

export const Loading = (props) => {
  const { isLoading } = props;

  return (
    <Modal visible={isLoading} transparent animationType="fade">
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size={60} color="black" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {},
});
