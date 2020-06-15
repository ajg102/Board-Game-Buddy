import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import NativeTouchable from "../NativeTouchable";
import { styles } from "./styles";

const CustomDrawer = (props) => {
  const screensState = useSelector((state) => state.screens.screens);
  const favoriteScreens = screensState
    .filter((item) => item.fav)
    .sort((a, b) => {
      if (a.label > b.label) return 1;
      if (a.label < b.label) return -1;
      return 0;
    });
  const otherScreens = screensState
    .filter((item) => !item.fav)
    .sort((a, b) => {
      if (a.label > b.label) return 1;
      if (a.label < b.label) return -1;
      return 0;
    });
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={[styles.labelStyle, { fontWeight: "bold" }]}>
          My Favorites
        </Text>
      </View>
      <View style={styles.divider} />
      {favoriteScreens.length > 0 ? (
        <>
          {favoriteScreens.map((screen) => (
            <NativeTouchable
              key={screen.nav}
              style={styles.container}
              onPress={() => props.navigation.navigate(screen.nav)}
            >
              <Text style={styles.labelStyle}>{screen.label}</Text>
            </NativeTouchable>
          ))}
          <View style={styles.divider} />
          <NativeTouchable
            style={styles.container}
            onPress={() => props.navigation.navigate("Settings")}
          >
            <Text style={styles.labelStyle}>Edit Favorites</Text>
          </NativeTouchable>
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Text>You haven't set any favorites yet...</Text>
          </View>
          <View style={styles.divider} />
          <NativeTouchable
            style={styles.container}
            onPress={() => props.navigation.navigate("Settings")}
          >
            <Text>Edit Favorites</Text>
          </NativeTouchable>
        </>
      )}
      <View style={styles.divider} />
      {otherScreens.map((screen) => (
        <NativeTouchable
          key={screen.nav}
          style={styles.container}
          onPress={() => props.navigation.navigate(screen.nav)}
        >
          <Text style={styles.labelStyle}>{screen.label}</Text>
        </NativeTouchable>
      ))}
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
