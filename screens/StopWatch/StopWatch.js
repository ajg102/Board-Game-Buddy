import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AppState,
} from "react-native";
import { styles } from "./styles";

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};

const StopWatch = (props) => {
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  //const [appState, setAppState] = useState(AppState.currentState);
  //const [backgroundTime, setBackgroundTime] = useState(0);
  const { mins, secs } = getRemaining(remainingSecs);
  const timerRef = useRef();
  //const backgroundTimerRef = useRef();

  // useEffect(() => {
  //   AppState.addEventListener("change", handleAppStateChange);
  //   return () => {
  //     AppState.removeEventListener("change", handleAppStateChange);
  //   };
  // }, []);

  // const handleAppStateChange = (nextAppState) => {
  //   console.log(nextAppState);
  //   if (nextAppState !== "active") {
  //     console.log(nextAppState, backgroundTime);
  //     backgroundTimerRef.current = setInterval(
  //       () => setBackgroundTime((prev) => prev + 1),
  //       1000
  //     );
  //   } else {
  //     setRemainingSecs((prev) => prev + backgroundTime);
  //     setBackgroundTime(0);
  //     clearInterval(backgroundTimerRef.current);
  //   }
  // };

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setRemainingSecs(0);
    setIsActive(false);
  };

  useEffect(() => {
    //let interval = null;
    if (isActive) {
      // interval = setInterval(() => {
      //   setRemainingSecs((remainingSecs) => remainingSecs + 1);
      // }, 1000);
      timerRef.current = setInterval(() => {
        setRemainingSecs((remainingSecs) => remainingSecs + 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      //clearInterval(interval);
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, remainingSecs]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={reset}
        style={[styles.button, styles.buttonReset]}
      >
        <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StopWatch;
