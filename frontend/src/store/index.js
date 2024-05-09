import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import employeeReducer from "./employeeSlice";

// Redux-Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, employeeReducer);

const store = configureStore({
  reducer: {
    employee: persistedReducer, // Use the persisted reducer
  },
});

export const persistor = persistStore(store);
export default store;
