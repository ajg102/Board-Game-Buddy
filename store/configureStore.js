import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore, createMigrate } from "redux-persist";
import { AsyncStorage } from "react-native";
import { migrations } from "./migrations";
import lifepointsReducer from "./reducers/lifepoints";
import screensReducer from "./reducers/screens";
import chessTimerReducer from "./reducers/chessTimer";
import heartsReducer from "./reducers/hearts";
import dartsReducer from "./reducers/darts";
import bracketsReducer from "./reducers/brackets";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["darts"],
  version: 0, //must specify version to migrate to
  migrate: createMigrate(migrations, { debug: true }),
};

const rootReducer = combineReducers({
  lifepoints: lifepointsReducer,
  screens: screensReducer,
  chessTimer: chessTimerReducer,
  hearts: heartsReducer,
  darts: dartsReducer,
  brackets: bracketsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistedStore = persistStore(store);

export { store, persistedStore };
