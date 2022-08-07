import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const formatNumber = (number) => `0${number}`.slice(-2);
const formatMS = (ms) => `${ms}`.substring(0, 2);

const getRemaining = (time) => {
  if (!time)
    return {
      mins: formatNumber(0),
      secs: formatNumber(0),
      ms: formatNumber(0),
    };
  const mins = Math.floor(time / 60000);
  const secs = Math.floor((time - mins * 60000) / 1000);
  const ms = time - mins * 60000 - secs * 1000;
  return {
    mins: formatNumber(mins),
    secs: formatNumber(secs),
    ms: formatMS(ms),
  };
};

const StopWatch = (props) => {
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const { mins, secs, ms } = getRemaining(remainingSecs);

  const toggle = async () => {
    if (isActive) {
      await AsyncStorage.removeItem("Stopwatch:Running");
    } else {
      setStartTime(remainingSecs > 0 ? new Date() - remainingSecs : new Date());
      await AsyncStorage.setItem("Stopwatch:Running", "true");
    }
    setIsActive((prev) => !prev);
  };

  const reset = async () => {
    setRemainingSecs(0);
    setIsActive(false);
    setStartTime(null);
    setStopTime(null);
    await AsyncStorage.removeItem("Stopwatch:Running");
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(new Date() - startTime);
      }, 10);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        {mins !== "00" && <Text style={styles.timerText}>{`${mins}`}</Text>}
        {mins !== "00" && <Text style={styles.timerText}>:</Text>}
        <Text style={styles.timerText}>{`${secs}`}</Text>
        <Text style={styles.timerText}>:</Text>
        <Text style={styles.msText}>{`${ms}`}</Text>
      </View>
      <View style={styles.gradient}>
        <LinearGradient
          colors={["#FE6B8B", "#FF8E53"]}
          locations={[0.3, 0.9]}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={toggle} style={styles.button2}>
            <Text style={styles.buttonText}>
              {isActive ? "Pause" : "Start"}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.gradient}>
        <LinearGradient
          colors={["#B9AAFF", "#FE6B8B"]}
          locations={[0.3, 0.9]}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={reset} style={[styles.button2]}>
            <Text style={[styles.buttonText, styles.buttonTextReset]}>
              Reset
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default StopWatch;
