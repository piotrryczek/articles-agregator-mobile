import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ArticlesStack } from 'navigators/articles-stack';
import { LoginStack } from 'navigators/login-stack';
import { RegisterStack } from 'navigators/register-stack';
import { PublishersStack } from 'navigators/publishers-stack';
import { AboutStack } from 'navigators/about-stack';
import { SettingsScreen } from 'screens/settings';
import { ConfirmEmailScreen } from 'screens/confirm-email';

import { AppState } from 'state/app-state';
import { refreshToken } from 'state/actions';
import { UserRole } from 'types';

import { log } from 'lib/helpers';

import { DrawerContent } from './drawer-content';

const Drawer = createDrawerNavigator();
const { Navigator, Screen } = Drawer;

export const AppDrawer = () => {
  const dispatch = useDispatch();
  const { jwtToken, role, hasAccess } = useSelector((state: AppState) => state);

  useEffect(() => {
    if (jwtToken) {
      dispatch(refreshToken());
    }
  }, []);

  const isLoggedReader = !!(jwtToken && role === UserRole.READER);
  const isNotLoggedInOrHasNotAccess =
    !jwtToken || (isLoggedReader && !hasAccess);

  return (
    <Navigator
      drawerPosition="right"
      initialRouteName="AppDrawer"
      drawerContent={(props) => (
        <DrawerContent {...props} jwtToken={jwtToken} />
      )}>
      <Screen
        name="ArticlesStack"
        options={{ title: 'Artykuły' }}
        component={ArticlesStack}
      />
      <Screen
        name="PublishersStack"
        options={{ title: 'Autorzy' }}
        component={PublishersStack}
      />

      {!jwtToken && (
        <Screen
          name="RegisterStack"
          options={{ title: 'Załóż konto' }}
          component={RegisterStack}
        />
      )}
      {!jwtToken && (
        <Screen
          name="LoginStack"
          options={{ title: 'Logowanie' }}
          component={LoginStack}
        />
      )}

      {/* {isLoggedReader && (
        <Screen
          name="Settings"
          options={{ title: 'Ustawienia' }}
          component={SettingsScreen}
        />
      )} */}
      <Screen
        name="AboutStack"
        options={{ title: 'O aplikacji' }}
        component={AboutStack}
      />
      {isNotLoggedInOrHasNotAccess && (
        <Screen
          name="ConfirmEmail"
          component={ConfirmEmailScreen}
          options={{ headerTitle: 'Potwierdzenie email' }}
        />
      )}
    </Navigator>
  );
};
