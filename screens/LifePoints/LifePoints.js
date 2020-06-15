import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import Keypad from "../../components/Keypad";
import ScoreBar from "./ScoreBar";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import { styles } from "./styles";
import * as Haptics from "expo-haptics";

const LifePoints = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const resetScores = useCallback(() => {
    dispatch({ type: "LIFEPOINTS:RESET" });
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item iconName="refresh" onPress={resetScores} title="reset" />
        </HeaderButtons>
      ),
    });
  }, [navigation]);
  const [score, setScore] = useState("");
  const addDigit = (digit) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setScore((score) => score.concat(digit.toString()));
  };
  const clearScore = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setScore("");
  };
  const backspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (score.length > 0) {
      setScore((score) => score.substring(0, score.length - 1));
    }
  };
  const adjustScore = (dmgObj) => {
    if (!score || score === "") {
      return;
    }
    const playerScore = dmgObj.currScore || 8000;
    let newScore;
    if (dmgObj.type === "dmg") {
      newScore = parseInt(playerScore) - parseInt(score);
    } else if (dmgObj.type === "heal") {
      newScore = parseInt(playerScore) + parseInt(score);
    }
    if (newScore < 0) {
      newScore = 0;
    }
    dispatch({
      type: "LIFEPOINTS:UPDATE",
      update: { [dmgObj.player]: newScore },
    });
    clearScore();
  };
  return (
    <View style={styles.container}>
      <View style={styles.scores}>
        <ScoreBar
          player={"p1"}
          backgroundColor={"#15b9d5"}
          changeScore={adjustScore}
        />
        <ScoreBar
          player={"p2"}
          backgroundColor={"red"}
          changeScore={adjustScore}
        />
        {score !== "" ? (
          <View style={styles.entry}>
            <Text style={{ color: "white", fontSize: 26, fontWeight: "700" }}>
              {score}
            </Text>
          </View>
        ) : null}
      </View>
      <Keypad add={addDigit} backspace={backspace} clear={clearScore} />
    </View>
  );
};

export default LifePoints;
