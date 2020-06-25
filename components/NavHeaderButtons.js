import React from "react";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";

export const MaterialHeaderButton = (props) => (
  <HeaderButton
    {...props}
    IconComponent={MaterialCommunityIcons}
    iconSize={28}
    color={Platform.OS === "ios" ? "white" : "white"}
  />
);
