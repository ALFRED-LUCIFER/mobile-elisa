// src/store/store.ts - Redux store configuration

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import slices
import authSlice from './slices/authSlice';
// import chatSlice from './slices/chatSlice';
// import machineSlice from './slices/machineSlice';
// import settingsSlice from './slices/settingsSlice';

// Temporary placeholder reducer
// const placeholderReducer = (state = {}, action: any) => state;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'settings'], // Only persist auth and settings
  blacklist: ['chat'], // Don't persist chat state (too large)
};

const rootReducer = combineReducers({
  auth: authSlice,
  // chat: chatSlice,
  // machine: machineSlice,
  // settings: settingsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: __DEV__,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
