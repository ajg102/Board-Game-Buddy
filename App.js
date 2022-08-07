import React, { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { enableScreens } from "react-native-screens";
import AppNav from "./navigator/AppNavigator";
import { store, persistedStore } from "./store/configureStore";
import { Provider as PaperProvider } from "react-native-paper";
import { Platform, StatusBar } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

enableScreens();

const loadFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-extra-bold": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
  });
};

export default function App() {
  //dev only
  // SplashScreen.preventAutoHide();
  // setTimeout(SplashScreen.hide, 20000);
  //
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading startAsync={loadFonts} onFinish={() => setDataLoaded(true)} />
    );
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <PaperProvider>
          <StatusBar barStyle={"light-content"} />
          <AppNav />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
