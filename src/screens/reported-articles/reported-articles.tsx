import React from 'react';
import { View, Text } from 'react-native';

import { screenStyles } from 'styles';
import { Articles } from 'components/articles';
import api from 'lib/api';

export const ReportedArticlesScreen = () => {
  return (
    <View style={screenStyles.screenWrapper}>
      <Articles apiCall={api.getReportedArticles} />
    </View>
  );
};
