import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { Menu } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import Cricket from "./Cricket";

const GAME_MODES = ["Cricket"];

const Darts = ({ navigation }) => {
  const dispatch = useDispatch();
  const [gameMode, setGameMode] = useState("Cricket");
  const [gameMenuOpen, setGameMenuOpen] = useState(false);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
  //         <Item
  //           iconName="refresh"
  //           onPress={() => dispatch({ type: "DARTS:RESET" })}
  //           title="reset"
  //         />
  //       </HeaderButtons>
  //     ),
  //   });
  // }, [navigation, dispatch]);

  const toggleGameMenu = () => {
    setGameMenuOpen((prev) => !prev);
  };

  const changeModeHandler = (mode) => {
    setGameMode(mode);
    setGameMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={gameMenuOpen}
        onDismiss={() => setGameMenuOpen(false)}
        anchor={
          <TouchableOpacity
            onPress={toggleGameMenu}
            style={styles.gameModePicker}
          >
            <Text style={styles.gameModePickerText}>{gameMode}</Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={28}
              color="white"
              style={{ position: "absolute", right: 12 }}
            />
          </TouchableOpacity>
        }
      >
        {GAME_MODES.map((item) => (
          <Menu.Item
            key={item}
            title={item}
            onPress={() => changeModeHandler(item)}
          />
        ))}
      </Menu>
      {gameMode === "Cricket" && <Cricket />}
    </View>
  );
};

export default Darts;
