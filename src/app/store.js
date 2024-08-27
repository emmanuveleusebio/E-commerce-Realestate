// store.js
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/dataSlice";
// import productReducer from './features/proudctSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

const presistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  globalValues: globalReducer,
});

const persistedReducer = persistReducer(presistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export const persistor = persistStore(store)
export default store;
