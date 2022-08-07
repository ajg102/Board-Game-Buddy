import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import NativeTouchable from "../NativeTouchable";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
    <>
      <LinearGradient
        colors={["#FE6B8B", "#FF8E53"]}
        locations={[0.3, 0.9]}
        style={styles.gradientBg}
      />
      <DrawerContentScrollView {...props}>
        <NativeTouchable
          style={[styles.container, { justifyContent: "space-between" }]}
          onPress={() => props.navigation.navigate("Favorites")}
        >
          <Text
            style={[
              styles.labelStyle,
              { fontWeight: "bold", fontFamily: "open-sans-extra-bold" },
            ]}
          >
            My Favorites
          </Text>
          <MaterialCommunityIcons
            name="playlist-edit"
            color="white"
            size={28}
          />
        </NativeTouchable>

        <View style={styles.divider} />
        {favoriteScreens.length > 0 ? (
          <>
            {favoriteScreens.map((screen) => (
              <NativeTouchable
                key={screen.nav}
                style={styles.container}
                onPress={() => props.navigation.navigate(screen.nav)}
              >
                <Text style={[styles.labelStyle, { fontWeight: "bold" }]}>
                  {screen.label}
                </Text>
              </NativeTouchable>
            ))}
          </>
        ) : (
          <>
            <View style={styles.container}>
              <Text style={{ color: "white", fontFamily: "open-sans" }}>
                You haven't set any favorites yet...
              </Text>
            </View>
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
    </>
  );
};

export default CustomDrawer;
