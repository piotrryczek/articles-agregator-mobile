import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { BottomSheetWrapper } from 'components/bottom-sheet-wrapper';
import { ArticlesHeaderTitle } from 'components/articles-header-title';
import { AppState } from 'state/app-state';

import { DashboardScreen } from 'screens/dashboard';
import { AllArticlesScreen } from 'screens/all-articles';
import { RegionsScreen } from 'screens/regions';
import { RegionScreen } from 'screens/region';
import { ArticleScreen } from 'screens/article';
import { PublisherScreen } from 'screens/publisher';
import { SavedArticlesScreen } from 'screens/saved-articles';
import { OwnArticlesScreen } from 'screens/own-articles';
import { ReportedArticlesScreen } from 'screens/reported-articles';
import { UserRole } from 'types';
import { baseScreenOptions } from 'lib/header/config';
import { fetchRegions } from 'state/actions';

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

export const ArticlesStack = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();
  const { regionGroups, jwtToken, role } = useSelector(
    (state: AppState) => state,
  );

  const isLoggedReader = !!(jwtToken && role === UserRole.READER);
  const isLoggedPublisher = !!(jwtToken && role === UserRole.PUBLISHER);

  const articlesGroups = useMemo(() => {
    const dataItems = [];

    if (isLoggedReader) {
      dataItems.push({
        id: 'dashboard',
        iconName: 'heartbeat',
        title: 'Obserwowane regiony',
        route: 'Dashboard',
        type: 'app',
      });
    }

    dataItems.push({
      id: 'all-articles',
      iconName: 'globe',
      title: 'Wszystkie',
      route: 'AllArticles',
      type: 'app',
    });

    if (isLoggedPublisher) {
      dataItems.push({
        id: 'own-articles',
        iconName: 'pencil',
        title: 'Twoje',
        route: 'OwnArticles',
        type: 'app',
      });

      dataItems.push({
        id: 'reported-articles',
        iconName: 'exclamation',
        title: 'Zgłoszone',
        route: 'ReportedArticles',
        type: 'app',
      });
    }

    if (isLoggedReader) {
      dataItems.push({
        id: 'saved-articles',
        iconName: 'bookmark',
        title: 'Zapisane',
        route: 'SavedArticles',
        type: 'app',
      });
    }

    return [
      {
        title: 'Twoje',
        index: 0,
        data: dataItems,
      },
      ...regionGroups,
    ];
  }, [isLoggedReader, isLoggedPublisher, regionGroups]);

  // Side Effects

  useEffect(() => {
    if (!regionGroups.length) {
      dispatch(fetchRegions());
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator
        initialRouteName="ArticlesStack"
        screenOptions={{
          ...baseScreenOptions({ navigation }),
        }}>
        {isLoggedReader && (
          <Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              headerTitle: () => (
                <ArticlesHeaderTitle title="Obserwowane regiony" />
              ),
            }}
          />
        )}

        <Screen
          name="AllArticles"
          component={AllArticlesScreen}
          options={{
            headerTitle: () => <ArticlesHeaderTitle title="Wszystkie" />,
          }}
        />
        <Screen
          name="Article"
          component={ArticleScreen}
          options={{
            headerTitle: () => <ArticlesHeaderTitle title="Artykuł" />,
          }}
        />
        <Screen
          name="Regions"
          component={RegionsScreen}
          options={{
            headerTitle: () => <ArticlesHeaderTitle title="Regiony" />,
          }}
        />
        <Screen
          name="Region"
          component={RegionScreen}
          options={{
            headerTitle: () => <ArticlesHeaderTitle title="Region" />,
          }}
        />
        {isLoggedReader && (
          <Screen
            name="SavedArticles"
            component={SavedArticlesScreen}
            options={{
              headerTitle: () => <ArticlesHeaderTitle title="Zapisane" />,
            }}
          />
        )}
        {isLoggedPublisher && (
          <Screen
            name="OwnArticles"
            component={OwnArticlesScreen}
            options={{
              headerTitle: () => <ArticlesHeaderTitle title="Twoje" />,
            }}
          />
        )}
        {isLoggedPublisher && (
          <Screen
            name="ReportedArticles"
            component={ReportedArticlesScreen}
            options={{
              headerTitle: () => <ArticlesHeaderTitle title="Zgłoszone" />,
            }}
          />
        )}
        <Screen
          name="Publisher"
          component={PublisherScreen}
          options={{ headerTitle: 'Autor' }}
        />
      </Navigator>

      <BottomSheetWrapper articlesGroups={articlesGroups} />
    </SafeAreaView>
  );
};
