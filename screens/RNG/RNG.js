import React, { useState, useRef } from "react";
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Text,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
              <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
            <TextInput
              value={low}
              mode="outlined"
              label="Min"
              style={styles.input}
              keyboardType="numeric"
              onChangeText={lowNumChangedHandler}
            />
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
              <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
            <TextInput
              value={hi}
              mode="outlined"
              label="Max"
              style={styles.input}
              keyboardType="numeric"
              onChangeText={hiNumChangedHandler}
            />
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
              <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
            <TextInput
              value={numGenerated}
              mode="outlined"
              label="How Many"
              style={styles.input}
              keyboardType="numeric"
              onChangeText={genNumChangedHandler}
              onBlur={onNumChangedBlur}
            />
            <TouchableOpacity
              style={styles.minusButton}
              onPressIn={() => onPressInMinus("num")}
              onPressOut={onPressOut}
            >
              <MaterialCommunityIcons name="minus" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={generate}>
            <LinearGradient
              colors={["#FE6B8B", "#FF8E53"]}
              locations={[0.3, 0.9]}
              style={styles.generateButton}
            >
              <Text style={styles.buttonText}>GENERATE</Text>
            </LinearGradient>
          </TouchableOpacity>
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
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default RNG;
