import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';

import { showToast } from 'lib/helpers';
import { logout } from 'state/actions';
import { ToastType } from 'types';
import { FONT_FAMILY_HEADER } from 'styles';

export const DrawerContent = (props) => {
  const { jwtToken, state, ...rest } = props;
  const { navigation } = props;

  const dispatch = useDispatch();

  const handleLogout = async () => {
    Alert.alert(
      'Na pewno chcesz się wylogować?',
      '',
      [
        {
          text: 'Nie',
          style: 'cancel',
        },
        {
          text: 'Tak',
          onPress: () => {
            dispatch(logout());
            navigation.navigate('ArticlesStack');
            showToast(ToastType.SUCCESS, 'Wylogowano.');
          },
        },
      ],
      { cancelable: true },
    );
  };

  const newState = { ...state };
  Object.assign(newState, {
    routes: newState.routes.filter(({ name }) => name !== 'ConfirmEmail'),
  });

  return (
    <DrawerContentScrollView {...rest}>
      <DrawerItemList
        state={newState}
        {...rest}
        activeBackgroundColor="transparent"
        labelStyle={styles.label}
        inactiveTintColor="#9f9f9f"
        activeTintColor="black"
      />
      {!!jwtToken && (
        <DrawerItem
          label="Wyloguj"
          onPress={handleLogout}
          labelStyle={styles.label}
          inactiveTintColor="#9f9f9f"
        />
      )}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: FONT_FAMILY_HEADER,
    fontSize: 18,
  },
});
