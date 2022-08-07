import * as Haptics from "expo-haptics";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import Keypad from "../../components/Keypad";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import { reset, update } from "../../store/reducers/lifepoints";
import ScoreBar from "./ScoreBar";
import { styles } from "./styles";

const LifePoints = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const resetHandler = () => {
    Alert.alert("Reset", "Reset this game?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: resetScores },
    ]);
  };
  const resetScores = useCallback(() => {
    dispatch(reset());
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item iconName="refresh" onPress={resetHandler} title="reset" />
        </HeaderButtons>
      ),
    });
  }, [navigation, dispatch]);
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
    dispatch(update({ update: { [dmgObj.player]: newScore } }));
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

        {score !== "" && (
          <View style={styles.entry}>
            <Text style={{ color: "white", fontSize: 26, fontWeight: "700" }}>
              {score}
            </Text>
          </View>
        )}
      </View>
      <Keypad add={addDigit} backspace={backspace} clear={clearScore} />
    </View>
  );
};

export default LifePoints;
