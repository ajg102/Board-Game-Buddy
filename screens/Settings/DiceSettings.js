import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Menu, Divider } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { sortByTime } from "../../helpers/sortByTime";
import { useNavigation } from "@react-navigation/native";

const COLORS = [
  "white",
  "#F78DA7", //pink
  "#EB144C", //red
  "#FF6900", //orange
  "#FCB900", //gold
  "#7BDCB5", //teal
  "#00D084", //green
  "#8ED1FC", //light blue
  "#0693E3", //blue
  "#9900EF", //purple
  "#8B4513", //brown
  "#ABB8C3", //gray
  "black",
];

const DiceSettings = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { defaultColor, history } = useSelector(
    (state) => state.settings.diceRoll
  );
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [color, setColor] = useState(defaultColor);

  const changeColorHandler = (val) => {
    setColor(val);
    setColorMenuOpen(false);
  };

  const clearHistoryHandler = () => {
    Alert.alert(
      "Clear History",
      "Would you like to clear your history? It will be permanently removed from your device.",
      [
        {
          text: "Yes",
          style: "destructive",
          onPress: () => dispatch({ type: "HISTORY:CLEAR", key: "diceRoll" }),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const _renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text
        numberOfLines={1}
        ellipsizeMode={"middle"}
        style={styles.historyItemText}
      >
        Total: {item.total} ({item.results.join(", ")}) -{" "}
        {moment(item.created).fromNow()}
      </Text>
    </View>
  );

  const onSaveHandler = () => {
    dispatch({ type: "DICE:SET_DEFAULT_COLOR", color: color });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.headerText}>DICE</Text>
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.textLabel}>Default Color</Text>
        <Menu
          anchor={
            <TouchableOpacity
              style={[{ backgroundColor: color }, styles.penColorButton]}
              onPress={() => setColorMenuOpen(true)}
            />
          }
          contentStyle={{ paddingBottom: 32 }}
          visible={colorMenuOpen}
          onDismiss={() => setColorMenuOpen(false)}
        >
          <TouchableOpacity
            style={[
              { backgroundColor: color, margin: 12 },
              styles.penColorButton,
            ]}
            onPress={() => setColorMenuOpen(true)}
          />
          <Divider />
          {COLORS.map((item) => {
            if (color === item) return null;
            return (
              <TouchableOpacity
                key={item}
                style={[
                  { backgroundColor: item, margin: 12 },
                  styles.penColorButton,
                ]}
                onPress={() => changeColorHandler(item)}
              />
            );
          })}
        </Menu>
      </View>
      <View
        style={[
          styles.sectionHeader,
          {
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          },
        ]}
      >
        <Text style={styles.headerText}>HISTORY</Text>
        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, right: 20, bottom: 5 }}
          onPress={clearHistoryHandler}
        >
          <Text style={[styles.headerText, { color: "red" }]}>CLEAR</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1, backgroundColor: "white" }}
          data={sortByTime("desc", history, "created")}
          keyExtractor={(item, index) => `${item.created}`}
          renderItem={_renderItem}
        />
      </View>
      <View style={styles.sectionHeader} />
      <TouchableOpacity
        onPress={onSaveHandler}
        style={[styles.rowItem, { justifyContent: "center" }]}
      >
        <Text style={styles.save}>Save</Text>
      </TouchableOpacity>
      <View style={{ height: 60 }} />
    </View>
  );
};

export default DiceSettings;
