import update from 'immutability-helper';

import { UserRole } from 'types';
import {
  LOGIN_PUBLISHER,
  LOGIN_READER,
  LOGOUT,
  SET_REGION_GROUPS,
  SET_FOLLOWED_REGIONS,
  SET_SAVED_ARTICLES,
  SET_REPORTED_ARTICLES,
} from './actions';
import { AppState } from './app-state';

export const appInitialState: AppState = {
  jwtToken: '',
  role: null,
  publisherId: '',
  regionGroups: [],
  savedArticles: [],
  followedRegions: [],
  reportedArticles: [],
  hasAccess: false,
};

export const appReducer = (state: AppState = appInitialState, action) => {
  switch (action.type) {
    case LOGIN_PUBLISHER: {
      const { jwtToken, reportedArticles = [], publisherId } = action.payload;

      return update(state, {
        jwtToken: { $set: jwtToken },
        role: { $set: UserRole.PUBLISHER },
        reportedArticles: { $set: reportedArticles },
        publisherId: { $set: publisherId },
      });
    }

    case LOGIN_READER: {
      const {
        jwtToken,
        followedRegions = [],
        savedArticles = [],
        hasAccess,
      } = action.payload;

      return update(state, {
        jwtToken: { $set: jwtToken },
        role: { $set: UserRole.READER },
        followedRegions: { $set: followedRegions },
        savedArticles: { $set: savedArticles },
        hasAccess: { $set: hasAccess },
      });
    }

    case LOGOUT: {
      return update(state, {
        jwtToken: { $set: '' },
        role: { $set: null },
        followedRegions: { $set: [] },
        savedArticles: { $set: [] },
      });
    }

    case SET_REGION_GROUPS: {
      return update(state, {
        regionGroups: { $set: action.payload },
      });
    }

    case SET_FOLLOWED_REGIONS: {
      return update(state, {
        followedRegions: { $set: action.payload },
      });
    }

    case SET_SAVED_ARTICLES: {
      return update(state, {
        savedArticles: { $set: action.payload },
      });
    }

    case SET_REPORTED_ARTICLES: {
      return update(state, {
        reportedArticles: { $set: action.payload },
      });
    }

    default:
      return state;
  }
};
