import { StyleSheet } from 'react-native';
import { BORDER_RADIUS } from './config';

export const formStyles = StyleSheet.create({
  facebookButton: {
    backgroundColor: '#3b5998',
    borderRadius: BORDER_RADIUS,
  },
  secondaryButton: {
    backgroundColor: '#17BEBB',
    borderRadius: BORDER_RADIUS,
  },
  button: {
    borderRadius: BORDER_RADIUS,
  },
  iconWrapperOverInput: {
    position: 'absolute',
    bottom: 9,
    right: 10,
  },
  iconWrapperOverInputHold: {
    right: 9,
  },
  iconOverInput: {
    opacity: 0.7,
    fontSize: 20,
  },
});
