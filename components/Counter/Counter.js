import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  InputAccessoryView,
  Button,
  Keyboard,
  Platform,
  Animated,
  Easing,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const id_1 = "a";
const isAndroid = Platform.OS === "android";

const Counter = ({
  counterLable = "",
  counterValue = 0,
  counterID,
  onRemoveCounter,
  incrementValue = 1,
  increment_1 = 1,
  increment_2 = 3,
  increment_3 = 5,
  increment_4 = 10,
}) => {
  const dispatch = useDispatch();
  const interval = useRef();
  const textInputRef = useRef();
  const animationRef = useRef(new Animated.Value(0));
  const listAnimationRef = useRef(new Animated.Value(0));
  const [label, setLabel] = useState(counterLable);
  const [open, setOpen] = useState(false);
  const [inc_1, setInc_1] = useState(increment_1 + "");
  const [inc_2, setInc_2] = useState(increment_2 + "");
  const [inc_3, setInc_3] = useState(increment_3 + "");
  const [inc_4, setInc_4] = useState(increment_4 + "");

  const labelChangeHandler = (val) => {
    setLabel(val);
  };

  const onPressInPlus = () => {
    dispatch({
      type: "COUNTERS:VALUE_ADD",
      id: counterID,
      increment: incrementValue,
    });
    interval.current = setInterval(
      () =>
        dispatch({
          type: "COUNTERS:VALUE_ADD",
          id: counterID,
          increment: incrementValue,
        }),
      300
    );
  };
  const onPressInMinus = () => {
    dispatch({
      type: "COUNTERS:VALUE_SUBTRACT",
      id: counterID,
      increment: incrementValue,
    });
    interval.current = setInterval(
      () =>
        dispatch({
          type: "COUNTERS:VALUE_SUBTRACT",
          id: counterID,
          increment: incrementValue,
        }),
      300
    );
  };
  const onPressOut = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
  };

  const focusInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const blurHandler = () => {
    dispatch({ type: "COUNTERS:UPDATE_TITLE", id: counterID, title: label });
  };

  const transitionHandler = () => {
    if (open) {
      setOpen(false);
      Animated.parallel([
        Animated.spring(animationRef.current, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(listAnimationRef.current, {
          toValue: 0,
          useNativeDriver: false,
          duration: 100,
          easing: Easing.ease,
        }),
      ]).start();
    } else {
      setOpen(true);
      Animated.parallel([
        Animated.spring(animationRef.current, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(listAnimationRef.current, {
          toValue: 1,
          useNativeDriver: false,
          duration: 300,
          easing: Easing.ease,
        }),
      ]).start();
    }
  };

  const changeIncrementHandler = (val) => {
    dispatch({
      type: "COUNTERS:UPDATE_INCREMENT",
      id: counterID,
      increment: val,
    });
  };

  const saveCustomIncrementHandler = () => {
    dispatch({
      type: "COUNTERS:UPDATE_ALL_CUSTOM_INCREMENTS",
      id: counterID,
      inc_1: parseInt(inc_1),
      inc_2: parseInt(inc_2),
      inc_3: parseInt(inc_3),
      inc_4: parseInt(inc_4),
    });
  };

  const iconRotation = animationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
  });

  const height = listAnimationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 370],
  });

  const borderRadius = listAnimationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={focusInput}
          style={styles.iconButton}
          hitSlop={{ top: 5, right: 15, bottom: 15, left: 5 }}
        >
          <MaterialCommunityIcons
            name="square-edit-outline"
            color="#aaa"
            size={28}
          />
        </TouchableOpacity>

        <TextInput
          ref={textInputRef}
          value={label}
          autoCorrect={false}
          onChangeText={labelChangeHandler}
          selectTextOnFocus={label === "New Counter"}
          style={styles.input}
          inputAccessoryViewID={id_1}
          onBlur={blurHandler}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onRemoveCounter(counterID)}
          hitSlop={{ top: 5, right: 5, bottom: 15, left: 15 }}
        >
          <MaterialCommunityIcons name="delete-circle" color="red" size={28} />
        </TouchableOpacity>
      </View>
      <View style={styles.valueContainer}>
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
        <Text style={styles.value}>{counterValue}</Text>
        <TouchableOpacity
          style={styles.minusButton}
          onPressIn={() => onPressInMinus("low")}
          onPressOut={onPressOut}
        >
          <MaterialCommunityIcons name="minus" size={30} color="white" />
        </TouchableOpacity>
      </View>
      {!isAndroid && (
        <InputAccessoryView nativeID={id_1} backgroundColor={"#dedede"}>
          <Button title="Done" onPress={() => Keyboard.dismiss()} />
        </InputAccessoryView>
      )}
      <View
        style={[styles.buttonContainer, { borderBottomWidth: open ? 0.5 : 0 }]}
      >
        <AnimatedTouchable
          onPress={() => changeIncrementHandler(increment_1)}
          style={[
            styles.accessoryButton,
            { borderBottomLeftRadius: borderRadius },
            incrementValue === increment_1 && { backgroundColor: "#FF8E53" },
          ]}
        >
          <Text
            style={[
              styles.incrementValueButton,
              incrementValue === increment_1 && {
                color: "#fff",
                fontFamily: "open-sans-bold",
              },
            ]}
          >
            {increment_1}
          </Text>
        </AnimatedTouchable>
        <View style={styles.verticalDivider} />
        <TouchableOpacity
          onPress={() => changeIncrementHandler(increment_2)}
          style={[
            styles.accessoryButton,
            incrementValue === increment_2 && { backgroundColor: "#FF8E53" },
          ]}
        >
          <Text
            style={[
              styles.incrementValueButton,
              incrementValue === increment_2 && {
                color: "#fff",
                fontFamily: "open-sans-bold",
              },
            ]}
          >
            {increment_2}
          </Text>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity
          onPress={() => changeIncrementHandler(increment_3)}
          style={[
            styles.accessoryButton,
            incrementValue === increment_3 && { backgroundColor: "#FF8E53" },
          ]}
        >
          <Text
            style={[
              styles.incrementValueButton,
              incrementValue === increment_3 && {
                color: "#fff",
                fontFamily: "open-sans-bold",
              },
            ]}
          >
            {increment_3}
          </Text>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity
          onPress={() => changeIncrementHandler(increment_4)}
          style={[
            styles.accessoryButton,
            incrementValue === increment_4 && {
              backgroundColor: "#FF8E53",
            },
          ]}
        >
          <Text
            style={[
              styles.incrementValueButton,
              incrementValue === increment_4 && {
                color: "#fff",
                fontFamily: "open-sans-bold",
              },
            ]}
          >
            {increment_4}
          </Text>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <AnimatedTouchable
          style={[
            styles.accessoryButton,
            { borderBottomRightRadius: borderRadius },
          ]}
          onPress={transitionHandler}
        >
          <AnimatedIcon
            size={27}
            color="black"
            name="dots-vertical"
            style={{ transform: [{ rotate: iconRotation }] }}
          />
        </AnimatedTouchable>
      </View>
      <Animated.View
        style={{
          height: height,
          width: "100%",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Text style={styles.menuTitle}>Change Custom Increments</Text>
        <TextInput
          value={inc_1}
          onChangeText={(val) => setInc_1(val)}
          style={styles.incrementInput}
          keyboardType="numeric"
          inputAccessoryViewID={id_1}
        />
        <TextInput
          value={inc_2}
          onChangeText={(val) => setInc_2(val)}
          style={styles.incrementInput}
          keyboardType="numeric"
          inputAccessoryViewID={id_1}
        />
        <TextInput
          value={inc_3}
          onChangeText={(val) => setInc_3(val)}
          style={styles.incrementInput}
          keyboardType="numeric"
          inputAccessoryViewID={id_1}
        />
        <TextInput
          value={inc_4}
          onChangeText={(val) => setInc_4(val)}
          style={styles.incrementInput}
          keyboardType="numeric"
          inputAccessoryViewID={id_1}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveCustomIncrementHandler}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Counter;
