import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore, createMigrate } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { migrations } from "./migrations";
import lifepointsReducer from "./reducers/lifepoints";
import screensReducer from "./reducers/screens";
import chessTimerReducer from "./reducers/chessTimer";
import heartsReducer from "./reducers/hearts";
import dartsReducer from "./reducers/darts";
import bracketsReducer from "./reducers/brackets";
import settingsReducer from "./reducers/settings";
import counterReducer from "./reducers/counters";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["darts"],
  version: 0, //must specify version to migrate to
  migrate: createMigrate(migrations, { debug: false }),
};

const rootReducer = combineReducers({
  lifepoints: lifepointsReducer,
  screens: screensReducer,
  chessTimer: chessTimerReducer,
  hearts: heartsReducer,
  darts: dartsReducer,
  brackets: bracketsReducer,
  settings: settingsReducer,
  counters: counterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistedStore = persistStore(store);

export { store, persistedStore };
