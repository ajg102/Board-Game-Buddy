import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  const [splits, setSplits] = useState([]);

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
    setSplits([]);
  };

  const _renderItem = ({ item, index }) => {
    const lap = getRemaining(item.lap);
    const total = getRemaining(item.total);
    return (
      <View style={styles.lapRowItem}>
        <View style={styles.lapRowItemSection}>
          <Text style={styles.lapRowItemText}>Lap {item.number}: </Text>
        </View>
        <View style={styles.lapRowItemSection}>
          {lap.mins !== "00" && (
            <Text style={styles.lapRowItemText}>{`${lap.mins}:`}</Text>
          )}
          <Text style={styles.lapRowItemText}>{`${lap.secs}:`}</Text>
          <Text style={styles.lapRowItemText}>{`${lap.ms}`}</Text>
        </View>
        <View style={styles.lapRowItemSection}>
          {total.mins !== "00" && (
            <Text style={styles.lapRowItemText}>{`${total.mins}:`}</Text>
          )}
          <Text style={styles.lapRowItemText}>{`${total.secs}:`}</Text>
          <Text style={styles.lapRowItemText}>{`${total.ms}`}</Text>
        </View>
      </View>
    );
  };

  const split = () => {
    if (!isActive) return;
    const data = [...splits];
    const lastSplit = data[0];
    if (!lastSplit) {
      data.unshift({ total: remainingSecs, lap: remainingSecs, number: 1 });
    } else {
      data.unshift({
        total: remainingSecs,
        lap: remainingSecs - lastSplit.total,
        number: lastSplit.number + 1,
      });
    }
    setSplits(data);
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
    <View
      style={[
        styles.container,
        {
          justifyContent:
            remainingSecs > 0 && splits.length > 0 ? "flex-start" : "center",
        },
      ]}
    >
      <View style={styles.timerContainer}>
        {mins !== "00" && <Text style={styles.timerText}>{`${mins}`}</Text>}
        {mins !== "00" && <Text style={styles.timerText}>:</Text>}
        <Text style={styles.timerText}>{`${secs}`}</Text>
        <Text style={styles.timerText}>:</Text>
        <Text style={styles.msText}>{`${ms}`}</Text>
      </View>
      {splits.length > 0 && (
        <LinearGradient
          colors={["#FE6B8B", "#FF8E53"]}
          locations={[0.3, 0.9]}
          style={styles.lapContainer}
        >
          <FlatList
            data={splits}
            style={{
              width: "100%",
              alignSelf: "center",
              height: "100%",
            }}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index + "key"}
          />
        </LinearGradient>
      )}
      {remainingSecs === 0 && (
        <>
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
          {/* <View style={styles.gradient}>
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
          </View> */}
        </>
      )}
      {remainingSecs > 0 && (
        <View style={styles.footer}>
          <View style={[styles.gradient, styles.footerGradient]}>
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
              <TouchableOpacity
                onPress={reset}
                hitSlop={{ top: 20, right: 20, left: 20, bottom: 20 }}
                style={[styles.button2, styles.footerButton2]}
              >
                <MaterialCommunityIcons
                  name={"restart"}
                  size={36}
                  color="#FE6B8B"
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View
            style={[styles.gradient, styles.footerGradient, { bottom: 18 }]}
          >
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
              <TouchableOpacity
                onPress={toggle}
                hitSlop={{ top: 20, right: 20, left: 20, bottom: 20 }}
                style={[styles.button2, styles.footerButton2]}
              >
                <MaterialCommunityIcons
                  name={isActive ? "pause" : "play"}
                  size={36}
                  color="#B9AAFF"
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={[styles.gradient, styles.footerGradient]}>
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
              <TouchableOpacity
                onPress={split}
                hitSlop={{ top: 20, right: 20, left: 20, bottom: 20 }}
                style={[styles.button2, styles.footerButton2]}
              >
                <MaterialCommunityIcons
                  name={"timer"}
                  size={36}
                  color="#B9AAFF"
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      )}
    </View>
  );
};

export default StopWatch;
