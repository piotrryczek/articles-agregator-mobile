import React, { useEffect, useReducer } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import { basicReducer } from 'lib/basic-reducer';
import { screenStyles } from 'styles';
import api from 'lib/api';
import { Loading } from 'components/loading';
import { Publisher } from 'components/publisher';
import { handleError } from 'state/actions';

export const PublisherScreen = (props) => {
  const { route } = props;

  const {
    params: { publisherId },
  } = route;

  const dispatch = useDispatch();
  const [state, setState] = useReducer(basicReducer, {
    publisher: null,
    isLoading: false,
  });

  const { publisher, isLoading } = state;

  const fetchPublisher = async () => {
    setState({ isLoading: true });
    try {
      const { data } = await api.getPublisherInformation(publisherId);

      const { publisher } = data;

      setState({ isLoading: false, publisher });
    } catch (error) {
      setState({ isLoading: false });
      dispatch(handleError(error));
    }
  };

  // Side effects

  useEffect(() => {
    fetchPublisher();
  }, [publisherId]);

  return (
    <ScrollView style={screenStyles.screenWrapper}>
      <Loading isLoading={isLoading} />
      <Publisher publisher={publisher} />
    </ScrollView>
  );
};
