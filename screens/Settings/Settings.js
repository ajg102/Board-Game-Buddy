import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NativeTouchable from "../../components/NativeTouchable";
import { LinearGradient } from "expo-linear-gradient";

const Settings = (props) => {
  const dispatch = useDispatch();
  const screens = useSelector((state) => state.screens.screens).sort((a, b) => {
    if (a.label > b.label) return 1;
    else if (a.label < b.label) return -1;
    else return 0;
  });
  const onItemSelected = (item) => {
    if (item.fav) {
      dispatch({ type: "FAVORITES:REMOVE", key: item.nav });
    } else {
      dispatch({ type: "FAVORITES:ADD", key: item.nav });
    }
  };
  const _renderItem = ({ item }) => (
    <NativeTouchable
      onPress={() => onItemSelected(item)}
      style={styles.rowItem}
    >
      <Text
        style={[
          styles.labelStyle,
          {
            fontWeight: item.fav ? "bold" : "normal",
            fontFamily: item.fav ? "open-sans-bold" : "open-sans",
          },
        ]}
      >
        {item.label}
      </Text>
      <MaterialCommunityIcons
        name={item.fav ? "star" : "star-outline"}
        color={item.fav ? "#FE6B8B" : "black"}
        size={item.fav ? 32 : 28}
      />
    </NativeTouchable>
  );

  return (
    <View style={styles.container}>
      {/* <LinearGradient colors={["#FE6B8B", "#FF8E53"]} locations={[0.3, 0.9]}> */}
      <View style={{ backgroundColor: "#FF8E53", width: "100%" }}>
        <Text style={styles.header} onPress={() => dispatch({ type: "RESET" })}>
          My Favorites
        </Text>
      </View>

      {/* </LinearGradient> */}

      <View style={styles.divider} />
      <FlatList
        data={screens}
        keyExtractor={(item, index) => item.nav}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default Settings;
