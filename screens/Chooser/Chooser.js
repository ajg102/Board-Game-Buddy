import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  Keyboard,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { Menu } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Chooser = ({ navigation }) => {
  const inputRef = useRef();
  const [players, setPlayers] = useState([]);
  const [results, setResults] = useState([]);
  const [name, setName] = useState("");
  const [numTeams, setNumTeams] = useState("No");
  const [teamsMenuOpen, setTeamsMenuOpen] = useState(false);
  const [hasShuffled, setHasShuffled] = useState(false);

  const numTeamsChangeHandler = (num) => {
    setNumTeams(num);
    setTeamsMenuOpen(false);
  };

  const addPlayerHandler = (playerName) => {
    const data = [...players];
    if (data.includes(playerName) && typeof playerName === "string") {
      const parts = playerName.split("::");
      if (parts.length === 1) {
        playerName += "::1";
      } else {
        playerName = parts[0] + `::${parseInt(parts[1]) + 1}`;
      }
      return addPlayerHandler(playerName);
    }
    data.push(playerName);
    setPlayers(data);
    setName("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setHasShuffled(false);
  };

  const removePlayerHandler = (idx) => {
    const data = [...players];
    data.splice(idx, 1);
    setPlayers(data);
  };

  const shuffle = () => {
    if (players.length === 0) return;
    const data = [...players];
    const howManyTeams = numTeams === "No" ? data.length : numTeams;
    const maxPlayersPerTeam = Math.ceil(data.length / howManyTeams);
    const shuffled = shuffleArray(data);
    let team = [];
    const res = [];
    for (var i = 0; i < shuffled.length; i++) {
      if (i % maxPlayersPerTeam === 0 && i !== 0) {
        res.push(team.join(", "));
        team = [shuffled[i]];
      } else {
        team.push(shuffled[i]);
      }
    }
    //push the left overs
    res.push(team.join(", "));
    team = [];
    //
    setResults(res);
    setHasShuffled(true);
  };

  const clearHandler = () => {
    setHasShuffled(false);
    setResults([]);
  };

  const clearPlayers = () => {
    setHasShuffled(false);
    setResults([]);
    setPlayers([]);
  };

  const _renderItem = ({ item, index }) => (
    <View style={{ minHeight: 56, width: "100%" }}>
      <Text style={styles.playerNameText}>
        {index + 1}: {item.replace(/::/g, " ")}
      </Text>
    </View>
  );

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
            <View style={styles.menuButton}>
              <MaterialCommunityIcons size={28} color="white" name="menu" />
            </View>
          </TouchableWithoutFeedback>
          <TextInput
            ref={inputRef}
            value={name}
            onChangeText={(val) => setName(val)}
            style={styles.input}
            onSubmitEditing={hideKeyboard}
          />
          <Menu
            visible={teamsMenuOpen}
            onDismiss={() => setTeamsMenuOpen(false)}
            anchor={
              <TouchableOpacity onPress={() => setTeamsMenuOpen(true)}>
                <LinearGradient
                  colors={["#FE6B8B", "#FF8E53"]}
                  locations={[0.3, 0.9]}
                  style={styles.teamButton}
                >
                  <Text
                    style={{ color: "white", fontFamily: "open-sans" }}
                  >{`${numTeams} ${numTeams === 1 ? "Team?" : "Teams"}`}</Text>
                </LinearGradient>
              </TouchableOpacity>
            }
          >
            {TEAM_SIZE_OPTIONS.map((num) => (
              <Menu.Item
                key={num + ""}
                title={num}
                onPress={() => numTeamsChangeHandler(num)}
              />
            ))}
          </Menu>
        </View>
        <TouchableOpacity onPress={() => addPlayerHandler(name)}>
          <LinearGradient
            colors={["#FE6B8B", "#FF8E53"]}
            locations={[0.3, 0.9]}
            style={styles.addPlayerButton}
          >
            <Text style={styles.addPlayerButtonText}>Add Player</Text>
          </LinearGradient>
        </TouchableOpacity>
        {!hasShuffled && (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollContainer}
          >
            {players.map((item, index) => (
              <TouchableOpacity
                style={{ margin: 8 }}
                key={`${index}`}
                onPress={() => removePlayerHandler(index)}
              >
                <Text style={styles.playerNameText}>
                  {item.replace("::", " ")}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {hasShuffled && (
          <FlatList
            style={{ flex: 1 }}
            data={results}
            keyExtractor={(item, index) => "" + index}
            renderItem={_renderItem}
          />
        )}
        <TouchableOpacity onPress={shuffle}>
          <LinearGradient
            colors={["#FE6B8B", "#FF8E53"]}
            locations={[0.3, 0.9]}
            style={styles.addPlayerButton}
          >
            <Text style={styles.addPlayerButtonText}>Shuffle</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={hasShuffled ? clearHandler : clearPlayers}>
          <LinearGradient
            colors={["#FE6B8B", "#FF8E53"]}
            locations={[0.3, 0.9]}
            style={styles.addPlayerButton}
          >
            <Text style={styles.addPlayerButtonText}>
              {hasShuffled ? "Clear" : "Clear Players"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
export default Chooser;

const TEAM_SIZE_OPTIONS = [
  "No",
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
];
