import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  Platform,
} from "react-native";
import {
  useKeepAwake,
  activateKeepAwake,
  deactivateKeepAwake,
} from "expo-keep-awake";
import * as Haptics from "expo-haptics";
import { NumericKeypad } from "../../components/Keypad";
import { reverseString } from "../../helpers/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Audio } from "expo-av";
import * as Notifications from "expo-notifications";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const soundObject = new Audio.Sound();

function formatDigit(string) {
  const digits = "00";
  if (string.length === 0) {
    return digits;
  } else if (string.length === 1) {
    return string + "0";
  } else return string;
}

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
  handleSuccess: () => console.log("shown"),
  handleError: (err) => console.log(err),
});

const Timer = ({ navigation }) => {
  //useKeepAwake(); //affects all screens since they are all mounted
  useFocusEffect(
    useCallback(() => {
      activateKeepAwake("timer");

      return () => deactivateKeepAwake("timer");
    }, [])
  );

  const { width, height } = useWindowDimensions();

  const [timer, setTimer] = useState(null);
  const [timeRemaing, setTimeRemaining] = useState(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState();
  const [run_number_key, setKey] = useState(0);

  const [hours, setHours] = useState("00"); //string value entered by user
  const [minutes, setMinutes] = useState("00"); //string value entered by user
  const [seconds, setSeconds] = useState("00"); //string value entered by user
  const [time, setTime] = useState(""); //string value entered by user
  const [textColor, setTextColor] = useState({ color: "#aaa" });

  useEffect(() => {
    requestPermissionAsync();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        stopAlarm();
      }
    );
    return () => subscription.remove();
  }, [navigation, stopAlarm]);

  const requestPermissionAsync = async () => {
    const settings = await Notifications.getPermissionsAsync();
    //console.log(settings);
    if (!settings.granted) {
      await Notifications.requestPermissionsAsync();
    }
  };

  useEffect(() => {
    const loadSound = async () => {
      try {
        await soundObject.loadAsync(require("../../assets/alarm.mp3"));
        // await Audio.setAudioModeAsync({
        //   staysActiveInBackground: true,
        //   playsInSilentModeIOS: true,
        // });
      } catch (err) {
        console.log(err);
      }
    };
    loadSound();
    return () => soundObject.unloadAsync();
  }, []);

  useEffect(() => {
    if (!playing) {
      try {
        if (soundObject._loaded) {
          soundObject.stopAsync();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [playing]);

  useEffect(() => {
    if (time !== "") {
      setTextColor({ color: "#FE6B8B" });
    } else {
      setTextColor({ color: "#aaa" });
    }
  }, [time]);

  useEffect(() => {
    setSeconds(reverseString(formatDigit(time.substring(0, 2))));
    setMinutes(reverseString(formatDigit(time.substring(2, 4))));
    setHours(reverseString(formatDigit(time.substring(4, 6))));
  }, [time]);

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
    const totalTime =
      parseInt(seconds) * 1000 +
      60000 * parseInt(minutes) +
      3600000 * parseInt(hours);
    setTimer(totalTime);
    setRunning(true);
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Board Game Buddy",
        body: "Time is up!",
        vibrate: true,
        //color: "#FF8E53",
        priority: Notifications.AndroidNotificationPriority.MAX,
      },
      trigger: new Date(Date.now() + totalTime),
    });
  };

  const onDeletePressed = async () => {
    setDone(false);
    setRunning(false);
    setTimer(null);
    setPlaying(false);
    setTimeRemaining(null);
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const onResetPressed = async () => {
    setRunning(false);
    setDone(false);
    setKey((prev) => prev + 1);
    setPlaying(false);
    setTimeRemaining(timer);
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const onCompleteHandler = () => {
    setRunning(false);
    setDone(true);
    setPlaying(true);
    //play audio
    soundObject.setPositionAsync(0);
    //soundObject.setIsLoopingAsync(true);
    soundObject.playAsync();
  };

  const pauseTimer = async () => {
    setRunning(false);
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const resumeTimer = () => {
    setRunning(true);
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Board Game Buddy",
        body: "Time is up!",
        vibrate: true,
        //color: "#FF8E53",
        priority: Notifications.AndroidNotificationPriority.MAX,
      },
      trigger: new Date(Date.now() + timeRemaing),
    });
  };

  const stopAlarm = async () => {
    await soundObject.stopAsync();
    await Notifications.dismissAllNotificationsAsync();
    onResetPressed();
  };

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
        <View style={{ flex: 1, alignItems: "center", paddingTop: 32 }}>
          <CountdownCircleTimer
            key={run_number_key}
            isPlaying={running}
            size={width > height ? height / 2 : width * 0.8}
            duration={timer / 1000 || 0}
            colors={[["#FE6B8B", 0.38], ["#FF8E53", 0.74], ["#A30000"]]}
            onComplete={onCompleteHandler}
          >
            {({ remainingTime, animatedColor }) => {
              const { hours: hrs, mins, secs, ms } = getRemaining(
                remainingTime * 1000
              );
              setTimeRemaining(remainingTime * 1000);
              return (
                <Animated.Text
                  onPress={() => setTimer(null)}
                  style={{
                    fontSize: 46,
                    color: animatedColor,
                    fontFamily: "open-sans",
                  }}
                >
                  {`${hrs !== "00" ? `${hrs}:` : ""}${
                    mins === "00" && hrs === "00" ? "" : `${mins}:`
                  }${hrs === "00" && mins === "00" ? `${secs}s` : secs}`}
                </Animated.Text>
              );
            }}
          </CountdownCircleTimer>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={onDeletePressed}
              style={styles.footerButton}
              hitSlop={{ top: 48 }}
            >
              <Text style={styles.footerButtonText}>DELETE</Text>
            </TouchableOpacity>
            {!done ? (
              <TouchableOpacity
                style={styles.startButton}
                onPress={running ? pauseTimer : resumeTimer}
              >
                <MaterialCommunityIcons
                  name={running ? "pause" : "play"}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.startButton} onPress={stopAlarm}>
                <MaterialCommunityIcons name="stop" size={24} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.footerButton}
              onPress={onResetPressed}
              hitSlop={{ top: 48 }}
            >
              <Text style={styles.footerButtonText}>RESET</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Timer;
