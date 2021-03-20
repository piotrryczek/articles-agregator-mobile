import React from 'react';

import { Hamburger } from 'components/hamburger';
import { FONT_FAMILY_HEADER_REGULAR } from 'styles';

export const baseScreenOptions = ({ navigation }) => ({
  headerRight: () => <Hamburger navigation={navigation} />,
  headerStyle: {
    backgroundColor: '#2a2a2a',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontFamily: FONT_FAMILY_HEADER_REGULAR,
    fontSize: 18,
  },
});
