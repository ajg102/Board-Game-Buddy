import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "../../helpers/normalize";
import { useKeepAwake } from "expo-keep-awake";
import { LinearGradient } from "expo-linear-gradient";

const formatNumber = (number) => `0${number}`.slice(-2);

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const mins = Math.floor((time - hours * 3600) / 60);
  const secs = time - mins * 60 - hours * 3600;
  return {
    hours: formatNumber(hours),
    mins: formatNumber(mins),
    secs: formatNumber(secs),
  };
};

const ChessClock = (props) => {
  useKeepAwake();
  const { navigation, route } = props;
  const { mode = "normal", modifier = "delay" } = route.params;
  const chessTimer = useSelector((state) => state.chessTimer);
  const [turnPlayer, setTurnPlayer] = useState("white");
  const [gameStarted, setGameStarted] = useState(false);
  const [clockRunning, setClockRunning] = useState(null);
  const [blackTime, setBlackTime] = useState(
    mode === "normal" ? chessTimer.initialTime : chessTimer.blackInitialTime
  );
  const [whiteTime, setWhiteTime] = useState(
    mode === "normal" ? chessTimer.initialTime : chessTimer.whiteInitialTime
  );
  const [blackMoves, setBlackMoves] = useState(0);
  const [whiteMoves, setWhiteMoves] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        goBackHandler();
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [goBackHandler])
  );

  useEffect(() => {
    let interval = null;
    if (gameStarted && turnPlayer === "black" && clockRunning === "black") {
      interval = setInterval(() => {
        setBlackTime((prev) => prev - 1);
      }, 1000);
    } else if (gameStarted && turnPlayer !== "black") {
      clearInterval(interval);
    } else if (!gameStarted && blackTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameStarted, blackTime, turnPlayer, clockRunning]);

  useEffect(() => {
    let interval = null;
    if (gameStarted && turnPlayer === "white" && clockRunning === "white") {
      interval = setInterval(() => {
        setWhiteTime((prev) => prev - 1);
      }, 1000);
    } else if (gameStarted && turnPlayer !== "white") {
      clearInterval(interval);
    } else if (!gameStarted && whiteTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameStarted, whiteTime, turnPlayer, clockRunning]);

  const resetHandler = () => {
    Alert.alert("Reset Timer", "Do you want to reset the timer?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => console.log("canceled"),
      },
      {
        text: "Yes",
        onPress: () => {
          setBlackTime(chessTimer.blackInitialTime);
          setWhiteTime(chessTimer.whiteInitialTime);
          setTurnPlayer("white");
          setGameStarted(false);
          setClockRunning(null);
          setWhiteMoves(0);
          setBlackMoves(0);
        },
      },
    ]);
  };

  const onStartGame = () => {
    setGameStarted(true);
    if (whiteMoves === 0) {
      setClockRunning("white");
    }
  };

  const onPauseGame = () => {
    setGameStarted(false);
  };

  const goBackHandler = () => {
    Alert.alert("Quit Game?", "Would you like to quit this game?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => navigation.goBack() },
    ]);
  };

  const onPassTurn = (color) => {
    if (!gameStarted) return;
    if (color === "white") {
      if (modifier === "increment" && blackMoves !== 0) {
        setBlackTime((prev) => prev + chessTimer.modifier);
      }
      setWhiteMoves((prev) => prev + 1);
      setTurnPlayer("black");
      if (modifier === "delay") {
        setTimeout(() => setClockRunning("black"), chessTimer.modifier * 1000);
      } else {
        setClockRunning("black");
      }
    } else {
      if (modifier === "increment") {
        setWhiteTime((prev) => prev + chessTimer.modifier);
      }
      setBlackMoves((prev) => prev + 1);
      setTurnPlayer("white");
      if (modifier === "delay") {
        setTimeout(() => setClockRunning("white"), chessTimer.modifier * 1000);
      } else {
        setClockRunning("white");
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-evenly" }}>
      <ClockItem
        color="black"
        timeRemaining={blackTime}
        moves={blackMoves}
        active={gameStarted && turnPlayer === "black"}
        onPassTurn={() => onPassTurn("black")}
      />
      <View style={styles.clockMenu}>
        <TouchableOpacity onPress={goBackHandler} style={styles.clockMenuItem}>
          <MaterialCommunityIcons
            name={"chevron-left"}
            size={size(32)}
            color="black"
          />
          <Text style={{ fontSize: 18, fontWeight: "700" }}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clockMenuItem}
          onPress={gameStarted ? onPauseGame : onStartGame}
        >
          <MaterialCommunityIcons
            name={gameStarted ? "pause" : "play"}
            size={size(32)}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.clockMenuItem} onPress={resetHandler}>
          <MaterialCommunityIcons
            name="refresh"
            size={size(32)}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <ClockItem
        color="white"
        timeRemaining={whiteTime}
        moves={whiteMoves}
        active={gameStarted && turnPlayer === "white"}
        onPassTurn={() => onPassTurn("white")}
      />
    </SafeAreaView>
  );
};

export default ChessClock;

const ClockItem = ({
  color = "white",
  timeRemaining = 0,
  moves = 0,
  active = false,
  onPassTurn,
}) => {
  const { hours, mins, secs } = formatTime(timeRemaining);
  return (
    <TouchableOpacity
      disabled={!active}
      onPress={onPassTurn}
      style={[
        styles.clockItem,
        {
          //backgroundColor: active ? "blue" : styles.clockItem.backgroundColor,
          transform: [{ rotate: color === "black" ? "180deg" : "0deg" }],
        },
      ]}
    >
      {active && (
        <LinearGradient
          colors={["#FE6B8B", "#FF8E53"]}
          locations={[0.3, 0.9]}
          style={styles.clockFaceLinearGradient}
        />
      )}
      <MaterialCommunityIcons
        name={"chess-queen"}
        size={36}
        color={color}
        style={{ padding: 8 }}
      />
      <Text style={styles.clockItemTime}>{`${
        hours !== "00" ? hours + ":" : ""
      }${mins}:${secs}`}</Text>
      <Text style={styles.clockItemMoves}>MOVES: {moves}</Text>
    </TouchableOpacity>
  );
};
