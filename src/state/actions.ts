import api from 'lib/api';
import { LoginManager } from 'react-native-fbsdk';
import { UserRole, ToastType } from 'types';
import { showToast } from 'lib/helpers';

import { AppState } from './app-state';

const prefix = 'APP';

export const LOGIN_READER = `${prefix}_LOGIN_READER`;
export const LOGIN_PUBLISHER = `${prefix}_LOGIN_PUBLISHER`;
export const LOGOUT = `${prefix}_LOGOUT`;
export const SET_REGION_GROUPS = `${prefix}_SET_REGION_GROUPS`;
export const SET_FOLLOWED_REGIONS = `${prefix}_SET_FOLLOWED_REGIONS`;
export const SET_SAVED_ARTICLES = `${prefix}_SET_SAVED_ARTICLES`;
export const SET_REPORTED_ARTICLES = `${prefix}_SET_REPORTED_ARTICLES`;

export const handleError = (
  error,
  message = '',
  if403ShouldLogout = true,
) => async (dispatch) => {
  if (error.response?.data?.statusCode === 403 && if403ShouldLogout) {
    dispatch(logout());
    showToast(ToastType.ERROR, 'Brak uprawnień. Wylogowano.');
  } else {
    const messageText = (() => {
      if (message) {
        return `${message}.`;
      }

      return 'Wystąpił błąd.';
    })();

    showToast(ToastType.ERROR, messageText);
  }

  console.log(error.response?.data || error);
};

export const refreshToken = () => async (dispatch, getState) => {
  try {
    const { role } = getState();

    if (role === UserRole.PUBLISHER) {
      const { data } = await api.publisherRefreshToken();

      const { token: jwtToken, reportedArticles, publisherId } = data;

      dispatch({
        type: LOGIN_PUBLISHER,
        payload: {
          jwtToken,
          reportedArticles,
          publisherId,
        },
      });
    } else if (role === UserRole.READER) {
      const { data } = await api.readerRefreshToken();

      const {
        token: jwtToken,
        toReadArticles,
        followedRegions,
        hasAccess,
      } = data;

      dispatch({
        type: LOGIN_READER,
        payload: {
          jwtToken,
          followedRegions,
          savedArticles: toReadArticles,
          hasAccess,
        },
      });
    }
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const loginReader = ({
  jwtToken,
  followedRegions,
  savedArticles,
  hasAccess,
}: {
  jwtToken: string;
  followedRegions: string[];
  savedArticles: string[];
  hasAccess: boolean;
}) => ({
  type: LOGIN_READER,
  payload: {
    jwtToken,
    followedRegions,
    savedArticles,
    hasAccess,
  },
});

export const loginPublisher = (
  jwtToken: string,
  reportedArticles: string[],
  publisherId: string,
) => ({
  type: LOGIN_PUBLISHER,
  payload: {
    jwtToken,
    reportedArticles,
    publisherId,
  },
});

export const logout = () => {
  LoginManager.logOut();
  return {
    type: LOGOUT,
  };
};

export const fetchRegions = () => async (dispatch) => {
  const { data } = await api.getRegions();
  const { regions } = data;

  const regionGroups = regions.reduce(
    (acc, region) => {
      const { _id: regionId, title, iconUrl, continent } = region;

      const regionsGroup = acc.find(
        ({ title: continentGroupName }) => continentGroupName === continent,
      );

      regionsGroup.data.push({
        title,
        iconUrl,
        id: regionId,
        type: 'region',
      });

      return acc;
    },
    [
      {
        title: 'Europa',
        data: [],
        index: 1,
      },
      {
        title: 'Azja',
        data: [],
        index: 2,
      },
      {
        title: 'Afryka',
        data: [],
        index: 3,
      },
      {
        title: 'Pozostałe',
        data: [],
        index: 4,
      },
    ],
  );

  dispatch({
    type: SET_REGION_GROUPS,
    payload: regionGroups,
  });
};

export const followRegion = (regionId: string) => (
  dispatch,
  getState: () => AppState,
) => {
  const { followedRegions } = getState();

  dispatch({
    type: SET_FOLLOWED_REGIONS,
    payload: [...followedRegions, regionId],
  });
};

export const unfollowRegion = (regionId: string) => (
  dispatch,
  getState: () => AppState,
) => {
  const { followedRegions } = getState();

  const filteredRegions = followedRegions.filter(
    (followedRegionId) => followedRegionId !== regionId,
  );

  dispatch({
    type: SET_FOLLOWED_REGIONS,
    payload: filteredRegions,
  });
};

export const saveArticle = (articleId: string) => (
  dispatch,
  getState: () => AppState,
) => {
  const { savedArticles } = getState();

  dispatch({
    type: SET_SAVED_ARTICLES,
    payload: [...savedArticles, articleId],
  });
};

export const unsaveArticle = (articleId: string) => (
  dispatch,
  getState: () => AppState,
) => {
  const { savedArticles } = getState();

  const filteredArticles = savedArticles.filter(
    (savedArticleId) => savedArticleId !== articleId,
  );

  dispatch({
    type: SET_SAVED_ARTICLES,
    payload: filteredArticles,
  });
};

export const reportArticle = (articleId: string) => (
  dispatch,
  getState: () => AppState,
) => {
  const { reportedArticles } = getState();

  dispatch({
    type: SET_REPORTED_ARTICLES,
    payload: [...reportedArticles, articleId],
  });
};

export const undoReportArticle = (articleId: string) => (
  dispatch,
  getState: () => AppState,
) => {
  const { reportedArticles } = getState();

  const filteredArticles = reportedArticles.filter(
    (reportedArticleId) => reportedArticleId !== articleId,
  );

  dispatch({
    type: SET_REPORTED_ARTICLES,
    payload: filteredArticles,
  });
};
