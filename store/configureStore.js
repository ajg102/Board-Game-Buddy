import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import chessTimerReducer from "./reducers/chessTimer";
import dartsReducer from "./reducers/darts";
import heartsReducer from "./reducers/hearts";
import lifepointsReducer from "./reducers/lifepoints";
import screensReducer from "./reducers/screens";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["darts"],
  version: -1, //must specify version to migrate to
};

const rootReducer = combineReducers({
  lifepoints: lifepointsReducer,
  screens: screensReducer,
  chessTimer: chessTimerReducer,
  hearts: heartsReducer,
  darts: dartsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});
const persistedStore = persistStore(store);

export { store, persistedStore };
