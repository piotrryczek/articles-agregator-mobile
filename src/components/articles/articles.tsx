import React, {
  useCallback,
  useReducer,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  VirtualizedList,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';

import { basicReducer } from 'lib/basic-reducer';
import config from 'lib/config';
import { handleError } from 'state/actions';
import { FONT_FAMILY_HEADER_REGULAR } from 'styles';

import { ArticleInList } from './article-in-list';
import { getItem, getItemCount, getKey } from './helpers';

export const Articles = (props) => {
  const { apiCall, restart = null } = props;

  const listRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const renderItem = useCallback(
    ({ item }) => <ArticleInList article={item} key={item.id} />,
    [],
  );

  const [state, setState] = useReducer(basicReducer, {
    isLoading: false,
    articles: [],
    page: 1,
    hasAllFetched: false,
  });

  const { isLoading, articles, page, hasAllFetched } = state;

  // Handlers

  const fetchArticles = async (newPage) => {
    setState({ isLoading: true });
    try {
      const { data } = await apiCall(newPage);

      const { articles: newArticles } = data;

      const finalArticles =
        newPage === 1 ? newArticles : [...articles, ...newArticles];

      setState({
        articles: finalArticles,
        isLoading: false,
        hasAllFetched: newArticles.length < config.perPage,
        page: newPage,
      });
    } catch (error) {
      setState({ isLoading: false, page: newPage });
      dispatch(handleError(error));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchArticles(1);
    setRefreshing(false);
  };

  const handleReachEnd = () => {
    if (hasAllFetched || isLoading) return;
    fetchArticles(page + 1);
  };

  // Side Effects
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToOffset({ x: 0, y: 0, animated: false });
    }

    fetchArticles(1);
  }, [restart]);

  return (
    <>
      {isLoading && (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size={80} color="black" />
        </View>
      )}
      {!isLoading && !articles.length && hasAllFetched && (
        <View style={styles.noArticlesWrapper}>
          <Text style={styles.noArticlesText}>Brak artykułów.</Text>
        </View>
      )}
      <VirtualizedList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ref={listRef}
        data={articles}
        initialNumToRender={4}
        renderItem={renderItem}
        keyExtractor={getKey}
        getItemCount={getItemCount}
        getItem={getItem}
        windowSize={30}
        removeClippedSubviews={true}
        onEndReached={handleReachEnd}
        onEndReachedThreshold={0.4} // 0.8
      />
    </>
  );
};

const styles = StyleSheet.create({
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noArticlesWrapper: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noArticlesText: {
    fontSize: 18,
    fontFamily: FONT_FAMILY_HEADER_REGULAR,
  },
});
