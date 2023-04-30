import { globalReducer } from './global/globalSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { articlesReducer } from './articles/articlesSlice';

const { configureStore, getDefaultMiddleware } = require('@reduxjs/toolkit');

const persistedGlobalReducer = persistReducer(
  { key: 'global', storage, whitelist: ['themeTitle'] },
  globalReducer
);

export const store = configureStore({
  reducer: {
    global: persistedGlobalReducer,
    articles: articlesReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

export const persistor = persistStore(store);
