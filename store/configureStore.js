import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import { AsyncStorage } from "react-native";

import lifepointsReducer from "./reducers/lifepoints";
import screensReducer from "./reducers/screens";
import chessTimerReducer from "./reducers/chessTimer";
import heartsReducer from "./reducers/hearts";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["lifepoints"],
};

const rootReducer = combineReducers({
  lifepoints: lifepointsReducer,
  screens: screensReducer,
  chessTimer: chessTimerReducer,
  hearts: heartsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistedStore = persistStore(store);

export { store, persistedStore };
