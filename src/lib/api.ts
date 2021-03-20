import axios from 'axios';
import qs from 'qs';
import config from 'lib/config';

import { store } from 'state/store';

class Api {
  private apiUrl;

  constructor() {
    this.apiUrl = config.apiUrl;
  }

  getConfig = (data: any = null, dataType = 'query') => {
    const jwtToken = store.getState().jwtToken;

    const config = {};

    if (jwtToken) {
      Object.assign(config, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    }
    if (data) {
      if (dataType === 'query') {
        Object.assign(config, {
          paramsSerializer: (params) => qs.stringify(params),
          params: data,
        });
      } else {
        Object.assign(config, {
          data,
        });
      }
    }
    return config;
  };

  post = (url, body = {}) =>
    axios.post(`${this.apiUrl}${url}`, body, this.getConfig());

  put = (url, body = {}) =>
    axios.put(`${this.apiUrl}${url}`, body, this.getConfig());

  patch = (url, body = {}) =>
    axios.patch(`${this.apiUrl}${url}`, body, this.getConfig());

  delete = (url, body = {}) =>
    axios.delete(`${this.apiUrl}${url}`, this.getConfig(body, 'body'));

  get = (url, query = {}) =>
    axios.get(`${this.apiUrl}${url}`, this.getConfig(query, 'query'));

  // Login & Register

  readerRefreshToken = () => this.post('/readers/refresh');

  loginByEmail = (email: string, password: string) =>
    this.post('/readers/loginByEmail', { email, password });

  registerByEmail = (email: string, password: string, repeatPassword: string) =>
    this.post('/readers/registerByEmail', { email, password, repeatPassword });

  verifyEmail = (emailVerificationCode: string) =>
    this.post('/readers/verifyEmail', { emailVerificationCode });

  authByFacebook = (authToken: string) =>
    this.post('/readers/authByFacebook', { authToken });

  // Articles

  getReaderArticles = (page = 1, perPage = config.perPage) =>
    this.get('/readers/articles', { page, perPage });

  getArticles = (page = 1, perPage = config.perPage) => {
    // console.log(page);
    return this.get('/articles', { page, perPage });
  };

  getArticle = (articleId: string) => this.get(`/articles/${articleId}`);

  getRegionArticles = (regionId: string, page = 1, perPage = config.perPage) =>
    this.get(`/regions/${regionId}/articles`, { page, perPage });

  getPublisherArticles = (
    publisherId: string,
    page = 1,
    perPage = config.perPage,
  ) => this.get(`/publishers/${publisherId}/articles`, { page, perPage });

  // Regions

  getRegions = () => this.get('/regions');

  getRegion = (regionId: string) => this.get(`/regions/${regionId}`);

  getFollowedRegions = () => this.get('/readers/regions');

  followRegion = (regionId: string) =>
    this.post(`/readers/regions/${regionId}`);

  unfollowRegion = (regionId: string) =>
    this.delete(`/readers/regions/${regionId}`);

  // Saved Articles

  getArticlesToRead = () => this.get('/readers/articlesToRead');

  addArticleToRead = (articleId: string) =>
    this.post(`/readers/articlesToRead/${articleId}`);

  removeArticleToRead = (articleId: string) =>
    this.delete(`/readers/articlesToRead/${articleId}`);

  // Publisher

  publisherRefreshToken = () => this.post('/publishers/refresh');

  getPublishers = () => this.get('/publishers');

  getPublisherInformation = (publisherId: string) =>
    this.get(`/publishers/${publisherId}`);

  publisherLogin = (email: string, password: string, code: string) =>
    this.post('/publishers/login', { email, password, code });

  getOwnArticles = (page = 1, perPage = config.perPage) =>
    this.get('/publishers/articles', { page, perPage });

  getReportedArticles = (page = 1, perPage = config.perPage) =>
    this.get('/publishers/articlesReported', { page, perPage });

  reportArticle = (articleId: string) =>
    this.post(`/publishers/articlesReported/${articleId}`);

  undoReportArticle = (articleId: string) =>
    this.delete(`/publishers/articlesReported/${articleId}`);
}

export default new Api();
