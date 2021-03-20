import { StyleSheet } from 'react-native';
import {
  SMALL_SPACE,
  SPACE,
  FONT_FAMILY_HEADER,
  FONT_FAMILY_TEXT_BOLD,
  FONT_FAMILY_TEXT_REGULAR,
} from './config';

// Common for both list and single view
export const articleStyles = StyleSheet.create({
  article: {
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  publisherTitle: {
    fontFamily: FONT_FAMILY_HEADER,
  },
  thumbnail: {
    position: 'relative',
    marginBottom: SMALL_SPACE,
  },
  popupMenuWrapper: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  regionAndDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: SMALL_SPACE,
  },
  region: {
    fontFamily: FONT_FAMILY_TEXT_REGULAR,
  },
  regionAndDateSeparator: {
    marginHorizontal: 10,
    marginBottom: 2,
  },
  date: {
    fontFamily: FONT_FAMILY_TEXT_REGULAR,
  },
  authorWrapper: { marginBottom: SPACE },
  author: {
    fontFamily: FONT_FAMILY_TEXT_BOLD,
  },
  title: {
    fontSize: 24,
    fontFamily: FONT_FAMILY_HEADER,
  },
});
