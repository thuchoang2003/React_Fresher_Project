import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./counter/accountSlice";
import counterSlice from "./counter/counterSlice";
import cartsSlice from "./counter/order/cartsSlice";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["account"],
};

const rootReducer = combineReducers({
  account: accountSlice,
  counter: counterSlice,
  carts: cartsSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);
export { persistor, store };
// export const store = configureStore({
//   reducer: {
//     account: accountSlice,
//   },
// });
