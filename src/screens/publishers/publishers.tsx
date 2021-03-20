import React, { useEffect, useReducer } from 'react';
import { SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';

import { basicReducer } from 'lib/basic-reducer';
import { screenStyles } from 'styles';
import api from 'lib/api';
import { Loading } from 'components/loading';
import { Publishers } from 'components/publishers';
import { handleError } from 'state/actions';

export const PublishersScreen = () => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(basicReducer, {
    publishers: [],
    isLoading: false,
  });

  const { publishers, isLoading } = state;

  const fetchPublishers = async () => {
    setState({ isLoading: true });
    try {
      const { data } = await api.getPublishers();

      const { publishers } = data;

      setState({ isLoading: false, publishers });
    } catch (error) {
      setState({ isLoading: false });
      dispatch(handleError(error));
    }
  };

  // Side effects

  useEffect(() => {
    fetchPublishers();
  }, []);

  return (
    <SafeAreaView style={screenStyles.screenWrapper}>
      <Loading isLoading={isLoading} />
      <Publishers publishers={publishers} />
    </SafeAreaView>
  );
};
