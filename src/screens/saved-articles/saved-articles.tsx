import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { screenStyles } from 'styles';
import { Articles } from 'components/articles';
import api from 'lib/api';

export const SavedArticlesScreen = () => {
  // const [refreshRef, setRefreshRef] = useState(null);
  // const isFirstRun = useRef(true);

  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   }
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (isFirstRun.current) return;

  //     console.log('Powinnismy odswieżać?');
  //     setRefreshRef({});
  //   }, [isFirstRun]),
  // );

  return (
    <View style={screenStyles.screenWrapper}>
      <Articles apiCall={api.getArticlesToRead} />
      {/* refresh={refreshRef} */}
    </View>
  );
};
