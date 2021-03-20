import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { ACTIVE_OPACITY } from 'styles';
import useBottomSheet from 'lib/hooks/use-bottom-sheet';
import { getCurrentRoute } from 'lib/helpers';
import { itemStyles } from './styles';

export const ArticlesGroup = (props) => {
  const { group } = props;
  const navigation = useNavigation();
  const currentRoute = useNavigationState(getCurrentRoute); // TODO: Should all logic be moved upper to ArticlesStack
  const { bottomSheetRef } = useBottomSheet();

  const { title, route, iconName } = group;

  const isFocused =
    currentRoute.name === route ||
    (route === 'Dashboard' && currentRoute.name === 'ArticlesStack'); // TODO: Refactor

  const handleGo = () => {
    bottomSheetRef.current.snapTo(1);
    setTimeout(() => navigation.navigate(route), 0);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        style={styles.anchorWrapper}
        onPress={handleGo}>
        <View style={styles.anchor}>
          <View style={styles.iconBackground}>
            <Icon
              name={iconName}
              size={36}
              color="#4c4c4c"
              type="font-awesome"
            />
          </View>
          <View>
            <Text style={[styles.title, isFocused && styles.titleFocused]}>
              {title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },

  anchorWrapper: {
    flex: 1,
  },
  anchor: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
  },
  iconBackground: {
    width: 48,
    marginRight: 10,
  },
  ...itemStyles,
});
