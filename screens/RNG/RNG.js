import React, { useState, useRef } from "react";
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const REGEX = /[^A-Za-z]/g;

const RNG = (props) => {
  const [low, setLow] = useState("1");
  const [hi, setHi] = useState("10");
  const [numGenerated, setNumGenerated] = useState("1");
  const [results, setResults] = useState([]);
  const interval = useRef();
  const lowNumChangedHandler = (val) => {
    setLow(val);
  };
  const hiNumChangedHandler = (val) => {
    setHi(val);
  };
  const genNumChangedHandler = (val) => {
    setNumGenerated(val);
  };
  const onNumChangedBlur = () => {
    if (parseInt(numGenerated) < 0 || isNaN(numGenerated)) {
      setNumGenerated("0");
    }
  };
  const increment = (type) => {
    switch (type) {
      case "low":
        setLow((prev) => {
          const num = parseInt(prev) + 1;
          return num + "";
        });
        break;
      case "hi":
        setHi((prev) => {
          const num = parseInt(prev) + 1;
          return num + "";
        });
        break;
      case "num":
        setNumGenerated((prev) => {
          const num = parseInt(prev) + 1;
          return num + "";
        });
        break;
      default:
        return;
    }
  };
  const decrement = (type) => {
    switch (type) {
      case "low":
        setLow((prev) => {
          const num = parseInt(prev) - 1;
          return num + "";
        });
        break;
      case "hi":
        setHi((prev) => {
          const num = parseInt(prev) - 1;
          return num + "";
        });
        break;
      case "num":
        setNumGenerated((prev) => {
          const num = parseInt(prev) - 1;
          if (num < 0) return "0";
          return num + "";
        });
        break;
      default:
        return;
    }
  };
  const generate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const data = [];
    for (var i = 0; i < numGenerated; i++) {
      data.push(getRandomIntInclusive(low, hi));
    }
    setResults(data);
  };
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }
  const onPressInPlus = (type) => {
    increment(type);
    interval.current = setInterval(() => increment(type), 300);
  };
  const onPressInMinus = (type) => {
    decrement(type);
    interval.current = setInterval(() => decrement(type), 300);
  };
  const onPressOut = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.plusButton}
              onPressIn={() => onPressInPlus("low")}
              onPressOut={onPressOut}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.inputLabelContainer}>
              <Text style={styles.labelStyle}>Min Value</Text>
              <TextInput
                value={low}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={lowNumChangedHandler}
              />
            </View>

            <TouchableOpacity
              style={styles.minusButton}
              onPressIn={() => onPressInMinus("low")}
              onPressOut={onPressOut}
            >
              <MaterialCommunityIcons name="minus" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.plusButton}
              onPressIn={() => onPressInPlus("hi")}
              onPressOut={onPressOut}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.inputLabelContainer}>
              <Text style={styles.labelStyle}>Max Value</Text>
              <TextInput
                value={hi}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={hiNumChangedHandler}
              />
            </View>

            <TouchableOpacity
              style={styles.minusButton}
              onPressIn={() => onPressInMinus("hi")}
              onPressOut={onPressOut}
            >
              <MaterialCommunityIcons name="minus" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.plusButton}
              onPressIn={() => onPressInPlus("num")}
              onPressOut={onPressOut}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.inputLabelContainer}>
              <Text style={styles.labelStyle}>Number to generate</Text>
              <TextInput
                value={numGenerated}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={genNumChangedHandler}
                onBlur={onNumChangedBlur}
              />
            </View>

            <TouchableOpacity
              style={styles.minusButton}
              onPressIn={() => onPressInMinus("num")}
              onPressOut={onPressOut}
            >
              <MaterialCommunityIcons name="minus" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={styles.resultsContainer}
            style={{ flex: 1 }}
          >
            {results.map((item, index) => (
              <Text key={index + ""} style={styles.result}>
                {item}
              </Text>
            ))}
          </ScrollView>
          <View style={{ height: 96, width: "100%" }}>
            <TouchableOpacity onPress={generate} style={styles.button}>
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <Text style={styles.buttonText}>GENERATE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default RNG;
