import React from 'react';
import { View } from 'react-native';

import api from 'lib/api';
import { screenStyles } from 'styles';

import { Articles } from 'components/articles';

export const AllArticlesScreen = () => {
  return (
    <View style={screenStyles.screenWrapper}>
      <Articles apiCall={api.getArticles} />
    </View>
  );
};
