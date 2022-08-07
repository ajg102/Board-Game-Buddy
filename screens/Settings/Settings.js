import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NativeTouchable from "../../components/NativeTouchable";
import { add, remove, reset } from "../../store/reducers/screens";
import { styles } from "./styles";

const Settings = (props) => {
  const dispatch = useDispatch();
  const screens = useSelector((state) => state.screens.screens);

  const onItemSelected = (item) => {
    if (item.fav) {
      dispatch(remove(item.nav));
    } else {
      dispatch(add(item.nav));
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
      <View style={{ backgroundColor: "#FF8E53", width: "100%" }}>
        <Text style={styles.header} onPress={() => dispatch(reset())}>
          My Favorites
        </Text>
      </View>

      <View style={styles.divider} />
      <FlatList
        data={[...screens].sort((a, b) => {
          if (a.label > b.label) return 1;
          else if (a.label < b.label) return -1;
          else return 0;
        })}
        keyExtractor={(item, index) => item.nav}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default Settings;
