import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ScoreBar = ({ player, backgroundColor, changeScore }) => {
  const score = useSelector((state) => state.lifepoints.scores[player]);
  return (
    <View style={styles.container}>
      <View style={[styles.score, { backgroundColor: backgroundColor }]}>
        <Text style={styles.text}>{score}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() =>
            changeScore({ player: player, type: "dmg", currScore: score })
          }
        >
          <MaterialCommunityIcons
            name="sword"
            color={backgroundColor}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            changeScore({ player: player, type: "heal", currScore: score })
          }
        >
          <MaterialCommunityIcons
            name="heart"
            color={backgroundColor}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 125,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    height: 75,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 26,
    color: "white",
    fontWeight: "600",
  },
  iconContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

ScoreBar.propTypes = {
  player: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  changeScore: PropTypes.func.isRequired,
};

export default ScoreBar;
