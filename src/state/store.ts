import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { appReducer } from './app-reducer';

// AsyncStorage.clear();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = createStore(persistedReducer, applyMiddleware(logger, thunk));
const persistor = persistStore(store);

export { store, persistor };
