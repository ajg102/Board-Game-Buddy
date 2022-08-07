import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Keypad from "../../components/Keypad";
import ScoreBar from "./ScoreBar";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import { Menu } from "react-native-paper";
import { styles } from "./styles";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

// const getBackgroundColor = (type, hasChanged) => {
//   if (!hasChanged) return {};
//   if (type === "dmg") {
//     return { backgroundColor: "#EB144C" };
//   } else {
//     return { backgroundColor: "#00D084" };
//   }
// };

const getBackgroundColors = (type, rtl) => {
  if (type === "dmg") {
    if (rtl) {
      return ["#EB144C", "#323232"];
    } else {
      return ["#323232", "#EB144C"];
    }
  } else {
    if (rtl) {
      return ["#00D084", "#323232"];
    } else {
      return ["#323232", "#00D084"];
    }
  }
};

const getBackgroundLocations = (rtl) => {
  if (rtl) {
    return [0.5, 0.8];
  } else return [0.2, 0.5];
};

const LifePoints = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [score, setScore] = useState("");
  const [mode, setMode] = useState("score");
  const [menuOpen, setMenuOpen] = useState(false);
  const logs = useSelector((state) => state.lifepoints.logs);
  const scores = useSelector((state) => state.lifepoints.scores);
  const p1Color = useSelector((state) => state.lifepoints.p1Color);
  const p2Color = useSelector((state) => state.lifepoints.p2Color);

  const scrollAnimation = useRef(new Animated.Value(0));
  const translateY = scrollAnimation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get("screen").height + 10, 0],
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item iconName="restart" onPress={resetHandler} title="reset" />
          <Menu
            visible={menuOpen}
            onDismiss={() => setMenuOpen(false)}
            anchor={<Item iconName="dots-vertical" onPress={toggleMenu} />}
          >
            <Menu.Item
              icon="note-text"
              title="Game Logs"
              onPress={modeChangeHandler}
            />
            <Menu.Item
              icon="settings"
              title="Settings"
              onPress={openSettingsHandler}
            />
          </Menu>
        </HeaderButtons>
      ),
    });
  }, [navigation, dispatch, menuOpen]);

  const addDigit = (digit) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (score !== "1/2") {
      setScore((score) => score.concat(digit.toString()));
    }
  };
  const clearScore = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setScore("");
  };
  const halfScore = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (score === "") {
      setScore("1/2");
    }
  };
  const backspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (score.length > 0) {
      if (score !== "1/2") {
        setScore((score) => score.substring(0, score.length - 1));
      } else {
        setScore("");
      }
    }
  };
  const adjustScore = (dmgObj) => {
    if (!score || score === "") {
      return;
    }
    const playerScore = dmgObj.currScore || 8000;
    let newScore;
    if (score === "1/2") {
      if (dmgObj.type === "dmg") {
        newScore = parseInt(playerScore) / 2;
      } else if (dmgObj.type === "heal") {
        newScore = parseInt(playerScore) + parseInt(playerScore) / 2;
      }
    } else {
      if (dmgObj.type === "dmg") {
        newScore = parseInt(playerScore) - parseInt(score);
      } else if (dmgObj.type === "heal") {
        newScore = parseInt(playerScore) + parseInt(score);
      }
    }

    if (newScore < 0) {
      newScore = 0;
    }
    dispatch({
      type: "LIFEPOINTS:UPDATE",
      update: { [dmgObj.player]: newScore },
    });
    dispatch({
      type: "LIFEPOINTS:LOGS_ADD",
      log: {
        player: dmgObj.player,
        type: dmgObj.type,
        currScore: playerScore,
        newScore,
        time: Date.now(),
        otherScore: dmgObj.player === "p1" ? scores.p2 : scores.p1,
      },
    });
    clearScore();
  };

  const resetHandler = () => {
    Alert.alert("Reset", "Reset this game?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: resetScores },
    ]);
  };

  const resetScores = useCallback(() => {
    if (mode !== "score") {
      modeChangeHandler();
    }
    dispatch({ type: "LIFEPOINTS:RESET" });
    dispatch({ type: "LIFEPOINTS:LOGS_CLEAR" });
  }, [mode]);

  const openSettingsHandler = () => {
    setMenuOpen(false);
    navigation.navigate("Settings", { lastScreen: "Lifepoints" });
  };

  const modeChangeHandler = () => {
    setMenuOpen(false);
    if (mode === "score") {
      setMode("logs");
      Animated.spring(scrollAnimation.current, {
        useNativeDriver: true,
        toValue: 1,
      }).start(() => {});
    } else {
      setMode("score");
      Animated.spring(scrollAnimation.current, {
        useNativeDriver: true,
        toValue: 0,
      }).start(() => {});
    }
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const resetGameStateHandler = (item, index) => {
    Alert.alert(
      "Reset Game State?",
      "Would you like to reset the game to this turn?",
      [
        {
          text: "Yes",
          onPress: () => {
            const change = Math.abs(item.newScore - item.currScore);
            const p1Score =
              item.player === "p1" ? item.currScore : item.otherScore;
            const p2Score =
              item.player === "p2" ? item.currScore : item.otherScore;
            dispatch({
              type: "LIFEPOINTS:RESET_GAME_STATE",
              p1Score,
              p2Score,
              logIndex: index,
            });
            modeChangeHandler();
            setScore(change + "");
          },
        },
        { text: "No", style: "cancel" },
      ]
    );
  };

  const _renderHeader = () => (
    <View style={styles.listHeaderContainer}>
      <View style={[styles.listHeaderItem]}>
        <Text style={styles.listHeaderItemText}>Player 1</Text>
      </View>
      <View style={[styles.listHeaderItem]}>
        <Text style={styles.listHeaderItemText}>Player 2</Text>
      </View>
    </View>
  );

  const _renderItem = ({ item, index }) => {
    const isLast = logs.length - 1 === index;
    const change =
      item.newScore - item.currScore > 0
        ? `+${item.newScore - item.currScore}`
        : item.newScore - item.currScore;
    const p1Score = item.player === "p1" ? item.currScore : item.otherScore;
    const p2Score = item.player === "p2" ? item.currScore : item.otherScore;
    const p1Change = item.player === "p1" ? change : "";
    const p2Change = item.player === "p2" ? change : "";
    return (
      <TouchableOpacity onLongPress={() => resetGameStateHandler(item, index)}>
        <View style={[styles.logItemContainer, { backgroundColor: "#323232" }]}>
          <View style={[styles.logItem, styles.addBorderRight]}>
            <Text style={[styles.logItemText, { color: "white" }]}>
              {p1Score}
            </Text>
          </View>
          <View style={[styles.logItem, styles.addBorderLeft]}>
            <Text style={[styles.logItemText, { color: "white" }]}>
              {p2Score}
            </Text>
          </View>
        </View>
        {/* <View style={styles.logItemContainer}> */}
        <LinearGradient
          style={styles.logItemContainer}
          start={[0, 0]}
          end={[1, 0]}
          locations={getBackgroundLocations(item.player === "p1")}
          colors={getBackgroundColors(item.type, item.player === "p1")}
        >
          <View style={[styles.logItem]}>
            <Text style={styles.logItemText}>{p1Change}</Text>
          </View>
          <View style={[styles.logItem]}>
            <Text style={styles.logItemText}>{p2Change}</Text>
          </View>
        </LinearGradient>
        {/* </View> */}
        {isLast && (
          <View
            style={[styles.logItemContainer, { backgroundColor: "#323232" }]}
          >
            <View style={[styles.logItem, styles.addBorderRight]}>
              <Text style={styles.logItemText}>
                {p1Change === "" ? item.otherScore : item.newScore}
              </Text>
            </View>
            <View style={[styles.logItem, styles.addBorderLeft]}>
              <Text style={styles.logItemText}>
                {p2Change === "" ? item.otherScore : item.newScore}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const _renderEmpty = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 32,
      }}
    >
      <Text style={styles.logItemText}>Game has not started yet.</Text>
      <Text style={styles.logItemText}>Good luck and have fun!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.scores}>
        <ScoreBar
          player={"p1"}
          backgroundColor={p1Color}
          changeScore={adjustScore}
        />
        <ScoreBar
          player={"p2"}
          backgroundColor={p2Color}
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
      <Keypad
        add={addDigit}
        backspace={backspace}
        clear={clearScore}
        half={halfScore}
      />
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [{ translateY: translateY }],
          },
        ]}
      >
        <FlatList
          data={logs}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => item.time + ""}
          ListHeaderComponent={_renderHeader}
          renderItem={_renderItem}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={_renderEmpty}
        />
        <View
          style={{
            width: "100%",
            height: 140,
            justifyContent: "space-evenly",
            alignItems: "center",
            //backgroundColor: "rgba(0,0,0,.6)",
            backgroundColor: "#323232",
          }}
        >
          <TouchableOpacity
            style={styles.logDoneButtonContainer}
            onPress={modeChangeHandler}
          >
            <Text style={styles.logDoneButtonText}>Done</Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              width: "90%",
              fontSize: 12,
              fontFamily: "open-sans",
              color: "white",
            }}
          >
            Tip: You can reset the game state by pressing and holding on the
            turn you would like to reset to.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default LifePoints;
