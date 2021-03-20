import React, { useEffect, useReducer } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import api from 'lib/api';
import { basicReducer } from 'lib/basic-reducer';
import { ArticlesHeaderTitle } from 'components/articles-header-title';
import { Article } from 'components/article';
import { screenStyles } from 'styles';
import { Loading } from 'components/loading';
import { handleError } from 'state/actions';

export const ArticleScreen = (props) => {
  const { navigation, route } = props;

  const {
    params: { articleId, regionTitle: regionTitleFromParams = '' },
  } = route;

  const dispatch = useDispatch();
  const [state, setState] = useReducer(basicReducer, {
    regionTitle: regionTitleFromParams,
    article: null,
    isLoading: false,
  });

  const { regionTitle, article, isLoading } = state;

  const fetchArticle = async () => {
    setState({
      isLoading: true,
    });

    try {
      const { data } = await api.getArticle(articleId);

      const { article } = data;
      const {
        region: { title: regionTitleFromApi },
      } = article;

      const newState = {
        article,
        isLoading: false,
        regionTitle: regionTitleFromApi,
      };

      setState(newState);
    } catch (error) {
      setState({ isLoading: false });
      dispatch(handleError(error));
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <ArticlesHeaderTitle title={regionTitle} />,
    });
  }, [regionTitle]);

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  return (
    <ScrollView style={screenStyles.screenWrapper}>
      <Loading isLoading={isLoading} />
      {article && <Article article={article} />}
    </ScrollView>
  );
};
