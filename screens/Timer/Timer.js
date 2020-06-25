import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import * as Haptics from "expo-haptics";
import { NumericKeypad } from "../../components/Keypad";
import { reverseString } from "../../helpers/utils";
import { Audio } from "expo-av";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { useKeepAwake } from "expo-keep-awake";

function formatDigit(string) {
  const digits = "00";
  if (string.length === 0) {
    return digits;
  } else if (string.length === 1) {
    return string + "0";
  } else return string;
}

const soundObject = new Audio.Sound();

const formatNumber = (number) => `0${number}`.slice(-2);
const formatMS = (ms) => `${ms}`.substring(0, 2);

const getRemaining = (time) => {
  const hours = Math.floor(time / 3600000);
  const mins = Math.floor((time - hours * 3600000) / 60000);
  const secs = Math.floor((time - hours * 3600000 - mins * 60000) / 1000);
  const ms = time - hours * 3600000 - mins * 60000 - secs * 1000;
  return {
    hours: formatNumber(hours),
    mins: formatNumber(mins),
    secs: formatNumber(secs),
    ms: formatMS(ms),
  };
};

const { width } = Dimensions.get("window");
const size = width - 128;
const strokeWidth = 10;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

const Timer = (props) => {
  useKeepAwake();

  const [timer, setTimer] = useState(null); //total time on timer as date
  const [timeLeft, setTimeLeft] = useState(null); //time left on timer

  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const [time, setTime] = useState(""); //string value entered by user

  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const circleProgress = useRef(new Animated.Value(0)).current;

  const { hours: hrs, mins, secs, ms } = getRemaining(timeLeft);

  const textColor = {
    color: time === "" ? "#aaa" : "#FE6B8B",
  };
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  // useEffect(() => {
  //   const loadSound = async () => {
  //     try {
  //       await soundObject.loadAsync(require("../../assets/alarm.mp3"));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   loadSound();
  //   return () => soundObject.unloadAsync();
  // }, []);

  // const playAudio = async () => {
  //   try {
  //     await soundObject.setPositionAsync(0);
  //     await soundObject.playAsync();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   Notifications.createCategoryAsync("timerActions", [
  //     { actionId: "stopTimer", buttonTitle: "Stop" },
  //     { actionId: "addMinute", buttonTitle: "Add 1 Minute" },
  //   ]);
  //   return () => Notifications.deleteCategoryAsync("timerActions");
  // }, []);

  // useEffect(() => {
  //   const checkPermissions = async () => {
  //     const results = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     if (results.status === "granted") {
  //       console.log("accepted");
  //     }
  //   };
  //   checkPermissions();
  // }, []);

  // useEffect(() => {
  //   const unsub = Notifications.addListener(handleNotification);
  //   return () => unsub.remove();
  // }, [handleNotification]);

  // const handleNotification = (event) => {
  //   if (event.actionId === "stopTimer") {
  //     onResetPressed();
  //   } else if (event.actionId === "addMinute") {
  //     addTimeToTimer(60);
  //   }
  //   console.log(event);
  // };

  useEffect(() => {
    setSeconds(reverseString(formatDigit(time.substring(0, 2))));
    setMinutes(reverseString(formatDigit(time.substring(2, 4))));
    setHours(reverseString(formatDigit(time.substring(4, 6))));
  }, [time]);

  useEffect(() => {
    let interval = null;
    if (running && !done) {
      interval = setInterval(() => {
        setTimeLeft(timer - new Date());
      }, 10);
    } else if (!running || done) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, timeLeft, done]);

  // useEffect(() => {
  //   if (done) {
  //     setRunning(false);
  //     //setPlaying(true);
  //     playAudio();
  //     // Notifications.presentLocalNotificationAsync({
  //     //   title: "Timer",
  //     //   body: "Time is up",
  //     //   categoryId: "timerActions",
  //     //   ios: {
  //     //     _displayInForeground: true,
  //     //   },
  //     //   android: {},
  //     // });
  //   }
  // }, [done]);

  const deleteTimeHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTime("");
  };

  const addDigit = (digit) => {
    if (time.length === 6) return;
    setTime((prev) => digit + prev);
  };
  const removeDigit = () => {
    setTime((prev) => prev.substring(1));
  };

  const startTimer = () => {
    //circleProgress.setValue(0);
    const totalTime =
      parseInt(seconds) * 1000 +
      60000 * parseInt(minutes) +
      3600000 * parseInt(hours);
    setTimer(new Date(Date.now() + totalTime));
    setTimeLeft(new Date(Date.now() + totalTime));
    setRunning(true);
    // Animated.timing(circleProgress, {
    //   useNativeDriver: true,
    //   toValue: 1,
    //   duration: totalTime * 1000,
    //   easing: Easing.linear,
    //   isInteraction: false,
    // }).start();
  };

  const resumeTimer = () => {
    //setRunning(true);
    console.log(new Date() + timeLeft);
    //setTimer(new Date() + timeLeft);
    // Animated.timing(circleProgress, {
    //   useNativeDriver: true,
    //   toValue: 1,
    //   duration: totalTime * 1000,
    //   easing: Easing.linear,
    //   isInteraction: false,
    // }).start();
  };

  const pauseTimer = () => {
    setRunning(false);
    // Animated.timing(circleProgress, {
    //   useNativeDriver: true,
    // }).stop();
  };

  const onDeletePressed = () => {
    circleProgress.setValue(0);
    setDone(false);
    setRunning(false);
    setTimer(null);
    setTimeLeft(null);
  };

  const onResetPressed = async () => {
    circleProgress.setValue(0);
    setRunning(false);
    setDone(false);
    setTimeLeft(timer);
    //await soundObject.stopAsync();
  };

  // const addTimeToTimer = (timeToAdd) => {
  //   circleProgress.setValue(0);
  //   setAnimationFunction(timeLeft + timeToAdd);
  //   setTimeLeft((prev) => prev + timeToAdd);
  //   setRunning(true);
  //   setPlaying(false);
  //   startAnimation(onAnimationDone);
  // };

  const progress = circleProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2],
  });

  const offset = Animated.multiply(progress, radius);

  return (
    <View style={styles.container}>
      {!timer && (
        <>
          <View style={styles.timeLimit}>
            <Text style={[styles.timeText, textColor]}>
              <Text style={{ fontSize: 48 }}>{hours}</Text>
              <Text>h</Text>
            </Text>
            <Text style={[styles.timeText, textColor]}>
              <Text style={{ fontSize: 48 }}>{minutes}</Text>
              <Text>m</Text>
            </Text>
            <Text style={[styles.timeText, textColor]}>
              <Text style={{ fontSize: 48 }}>{seconds}</Text>
              <Text>s</Text>
            </Text>
            <TouchableOpacity
              onLongPress={deleteTimeHandler}
              onPress={removeDigit}
            >
              <MaterialCommunityIcons
                size={24}
                color={time === "" ? "#bbb" : "black"}
                name="backspace"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <NumericKeypad add={addDigit} />
          {time !== "" && (
            <TouchableOpacity style={styles.startButton} onPress={startTimer}>
              <MaterialCommunityIcons name="play" size={24} color="white" />
            </TouchableOpacity>
          )}
        </>
      )}
      {timer && (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 64,
            }}
          >
            <Svg width={size} height={size}>
              <Circle
                fill="#FF8E53"
                stroke="rgba(255, 255, 255, 0.8)"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
              />
              <AnimatedCircle
                fill="none"
                stroke="#FE6B8B"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
              />
            </Svg>
            <Text style={styles.timerCountdownText}>{`${
              hrs !== "00" ? `${hrs}:` : ""
            }${mins === "00" && hrs === "00" ? "" : `${mins}:`}${
              hrs === "00" && mins === "00" ? `${secs}s` : secs
            }`}</Text>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={onDeletePressed}
              style={styles.footerButton}
            >
              <Text style={styles.footerButtonText}>DELETE</Text>
            </TouchableOpacity>

            {!done && !running && (
              <TouchableOpacity
                style={styles.startButton}
                onPress={!timeLeft || timeLeft <= 0 ? startTimer : resumeTimer}
              >
                <MaterialCommunityIcons name="play" size={24} color="white" />
              </TouchableOpacity>
            )}
            {!done && running && (
              <TouchableOpacity style={styles.startButton} onPress={pauseTimer}>
                <MaterialCommunityIcons name="pause" size={24} color="white" />
              </TouchableOpacity>
            )}
            {!running && done && (
              <TouchableOpacity
                style={styles.startButton}
                onPress={onResetPressed}
              >
                <MaterialCommunityIcons name="stop" size={24} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.footerButton}
              onPress={onResetPressed}
            >
              <Text style={styles.footerButtonText}>RESET</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Timer;
