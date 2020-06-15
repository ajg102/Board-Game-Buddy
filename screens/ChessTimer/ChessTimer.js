import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ButtonToggle from "../../components/ButtonToggle/ButtonToggle";
import TimePicker from "./TimePicker";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";

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

const ChessTimer = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch({ type: "RESET:CHESS" });
  // });
  const [mode, setMode] = useState("normal");
  const [modifier, setModifier] = useState("delay");
  const [editing, setEditing] = useState(null);
  const chessTimer = useSelector((state) => state.chessTimer);
  const modeChangeHandler = (val) => {
    setMode(val);
  };
  const modifierChangeHandler = (val) => {
    setModifier(val);
  };

  const getTimeByType = () => {
    switch (editing) {
      case "SET_INITIAL_TIME":
        return chessTimer.initialTime;
      case "SET_WHITE_TIME":
        return chessTimer.whiteInitialTime;
      case "SET_BLACK_TIME":
        return chessTimer.blackInitialTime;

      case "SET_MODIFIER":
        return chessTimer.modifier;
      default:
        return 0;
    }
  };

  const onDismissDialog = () => {
    setEditing(null);
  };

  const onPlayHandler = () => {
    try {
      navigation.navigate("ChessTimer", {
        screen: "ChessClock",
        params: {
          mode,
          modifier,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const timeChangeHandler = (hrs, mins, secs) => {
    const hours = parseInt(hrs);
    const minutes = parseInt(mins);
    const seconds = parseInt(secs);
    const totalTime = hours * 3600 + minutes * 60 + seconds;
    dispatch({ type: editing, time: totalTime });
    setEditing(null);
  };

  const formattedTime = formatTime(chessTimer.initialTime);
  const formattedWhite = formatTime(chessTimer.whiteInitialTime);
  const formattedBlack = formatTime(chessTimer.blackInitialTime);
  const formattedModifier = formatTime(chessTimer.modifier);

  return (
    <View style={styles.container}>
      <ButtonToggle
        items={[
          { label: "STANDARD", value: "normal" },
          { label: "HANDICAP", value: "handicap" },
        ]}
        onItemSelected={modeChangeHandler}
        selectedValue={mode}
      />
      {mode === "normal" ? (
        <TouchableOpacity
          style={styles.rowItem}
          onPress={() => setEditing("SET_INITIAL_TIME")}
        >
          <Text>GAME IN</Text>
          <Text>{`${
            formattedTime.hours !== "00" ? formattedTime.hours + ":" : ""
          }${formattedTime.mins}:${formattedTime.secs}`}</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => setEditing("SET_WHITE_TIME")}
          >
            <Text>WHITE TIME</Text>
            <Text>{`${
              formattedWhite.hours !== "00" ? formattedWhite.hours + ":" : ""
            }${formattedWhite.mins}:${formattedWhite.secs}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => setEditing("SET_BLACK_TIME")}
          >
            <Text>BLACK TIME</Text>
            <Text>{`${
              formattedBlack.hours !== "00" ? formattedBlack.hours + ":" : ""
            }${formattedBlack.mins}:${formattedBlack.secs}`}</Text>
          </TouchableOpacity>
        </View>
      )}
      <ButtonToggle
        items={[
          { label: "INCREMENT", value: "increment" },
          { label: "DELAY", value: "delay" },
        ]}
        onItemSelected={modifierChangeHandler}
        selectedValue={modifier}
      />
      <TouchableOpacity
        style={styles.rowItem}
        onPress={() => setEditing("SET_MODIFIER")}
      >
        <Text>MODIFIER</Text>
        <Text>
          {modifier === "increment" ? "Increment" : "Delay"}{" "}
          {`${
            formattedModifier.hours !== "00"
              ? formattedModifier.hours + ":"
              : ""
          }${formattedModifier.mins}:${formattedModifier.secs}`}
        </Text>
      </TouchableOpacity>
      <Text style={styles.helperText}>
        {modifier === "increment"
          ? "Add some extra time at the beginning of each players turn."
          : "Wait some time before beginning the timer at the start of a player's turn."}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPlayHandler}>
        <Text style={styles.buttonText}>PLAY!</Text>
      </TouchableOpacity>
      <TimePicker
        visible={Boolean(editing)}
        onDone={timeChangeHandler}
        onCancel={onDismissDialog}
        title="Set Timer"
        time={getTimeByType()}
      />
    </View>
  );
};

export default ChessTimer;
