import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { StatusBar, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppNav from "./navigator/AppNavigator";
import { persistedStore, store } from "./store/configureStore";

enableScreens();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-extra-bold": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <PaperProvider>
          <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <StatusBar
              barStyle={
                Platform.OS === "ios" ? "light-content" : "light-content"
              }
            />
            <AppNav />
          </View>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
