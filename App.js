import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { enableScreens } from "react-native-screens";
import AppNav from "./navigator/AppNavigator";
import { store, persistedStore } from "./store/configureStore";
import { Provider as PaperProvider } from "react-native-paper";
import { Platform, StatusBar } from "react-native";

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <PaperProvider>
          <StatusBar
            barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
          />
          <AppNav />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
