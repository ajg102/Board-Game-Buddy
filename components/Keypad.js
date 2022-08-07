import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { size } from "../helpers/normalize";

const iconPre = Platform.OS === "android" ? "md-" : "ios-";

const Keypad = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowItem}>
        <Digit digit={"1"} onPress={props.add} />
        <Digit digit={"2"} onPress={props.add} />
        <Digit digit={"3"} onPress={props.add} />
      </View>
      <View style={styles.rowItem}>
        <Digit digit={"4"} onPress={props.add} />
        <Digit digit={"5"} onPress={props.add} />
        <Digit digit={"6"} onPress={props.add} />
      </View>
      <View style={styles.rowItem}>
        <Digit digit={"7"} onPress={props.add} />
        <Digit digit={"8"} onPress={props.add} />
        <Digit digit={"9"} onPress={props.add} />
      </View>
      <View style={styles.rowItem}>
        <Digit digit={"0"} onPress={props.add} />
        <Digit digit={"00"} onPress={props.add} />
        <Digit digit={"000"} onPress={props.add} />
      </View>
      <View style={styles.rowItem}>
        {/* <View style={[styles.digit, { backgroundColor: "transparent" }]} /> */}
        <TouchableOpacity style={styles.digit} onPress={props.half}>
          <Text style={styles.text}>1/2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.digit} onPress={props.backspace}>
          <Ionicons name={iconPre + "backspace"} size={40} color={"#f9f9f9"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.digit} onPress={props.clear}>
          <Text style={styles.text}>Clr</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    paddingTop: 16,
  },
  rowItem: {
    width: "100%",
    height: size(80),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  digit: {
    width: size(75),
    height: size(75),
    borderRadius: size(25),
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#f9f9f9",
    fontWeight: "800",
    fontFamily: "open-sans-extra-bold",
  },
});

Keypad.propTypes = {
  add: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  backspace: PropTypes.func.isRequired,
};

export default Keypad;

const Digit = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.digit.toString())}
      style={styles.digit}
    >
      <Text style={styles.text}>{props.digit}</Text>
    </TouchableOpacity>
  );
};

export const NumericKeypad = (props) => (
  <View style={styles.container}>
    <View style={styles.rowItem}>
      <Digit digit={"1"} onPress={props.add} />
      <Digit digit={"2"} onPress={props.add} />
      <Digit digit={"3"} onPress={props.add} />
    </View>
    <View style={styles.rowItem}>
      <Digit digit={"4"} onPress={props.add} />
      <Digit digit={"5"} onPress={props.add} />
      <Digit digit={"6"} onPress={props.add} />
    </View>
    <View style={styles.rowItem}>
      <Digit digit={"7"} onPress={props.add} />
      <Digit digit={"8"} onPress={props.add} />
      <Digit digit={"9"} onPress={props.add} />
    </View>
    <View style={styles.rowItem}>
      <Digit digit={"0"} onPress={props.add} />
    </View>
  </View>
);
