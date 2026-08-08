import { baseApi } from './apis/base.api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


const persistConfig = {
  key: 'root',
  storage : AsyncStorage,
  whitelist: ['auth'],
}

const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
});
const persistedReduces = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReduces,
  devTools: __DEV__,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
})

// Create a persistor instance
export const Persistor = persistStore(store);

// Infer the types
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;