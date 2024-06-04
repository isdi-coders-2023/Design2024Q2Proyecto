import createSagaMiddleware from '@redux-saga/core';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice from './auth/authSlice';
import actionWatcher from './sagas';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
};

const AuthPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isLoggedIn', 'user'],
};

const appReducer = combineReducers({
    auth: persistReducer(AuthPersistConfig, authSlice.reducer),
});

export type AppState = ReturnType<typeof appReducer>;

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: persistReducer(persistConfig, appReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(actionWatcher);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
