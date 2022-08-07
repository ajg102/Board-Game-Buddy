import React, { useMemo, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  InputAccessoryView,
  Keyboard,
  Button,
  Text,
  Animated,
  Easing,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import CounterPicker from "./CounterPicker";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

const id_1 = "a";
const isAndroid = Platform.OS === "android";

const Aggregator = ({
  parents = [],
  counterID = "",
  onRemoveCounter,
  counterLable = "New Aggregator",
  currChildren = [],
}) => {
  const dispatch = useDispatch();
  const animationRef = useRef(new Animated.Value(0));
  const listAnimationRef = useRef(new Animated.Value(0));
  const allCounters = useSelector((state) => state.counters.counters);
  const counters = allCounters.filter(
    (item) =>
      item.parents && item.parents.includes(counterID) && item.id !== counterID
  );
  const textInputRef = useRef();
  const [label, setLabel] = useState(counterLable);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const labelChangeHandler = (val) => {
    setLabel(val);
  };

  //console.log(counters);

  const focusInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const blurHandler = () => {
    dispatch({ type: "COUNTERS:UPDATE_TITLE", id: counterID, title: label });
  };

  const total = useMemo(() => {
    let sum = 0;
    for (var i = 0; i < counters.length; i++) {
      if (!counters[i].type || counters[i].type === "simple") {
        sum += counters[i].value;
      } else {
        //this is another agg
        const otherVals = counters[i].children.filter(
          (item) => !currChildren.includes(item)
        );
        otherVals.forEach((val) => {
          const index = allCounters.findIndex((item) => item.id === val);
          sum += allCounters[index].value;
        });
      }
    }
    return sum;
  }, [counters]);

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

  const selectChildrenHandler = (data) => {
    console.log(data);
    dispatch({
      type: "COUNTERS:UPDATE_AGGREGATORS",
      id: counterID,
      children: data,
    });
    setModalOpen(false);
  };

  const iconRotation = animationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-180deg"],
  });

  const height = listAnimationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, counters.length * 50 + 24],
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
          selectTextOnFocus={label === "New Aggregator"}
          style={styles.input}
          inputAccessoryViewID={id_1}
          onBlur={blurHandler}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onRemoveCounter(counterID)}
          hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
        >
          <MaterialCommunityIcons name="delete-circle" color="red" size={28} />
        </TouchableOpacity>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{total}</Text>
      </View>
      <TouchableOpacity
        onPress={toggleModal}
        style={{
          width: "80%",
          height: 44,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontFamily: "open-sans-bold",
            color: "#FF8E53",
          }}
        >
          Select Counters
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={transitionHandler}
        style={[
          styles.buttonContainer,
          {
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
            borderBottomWidth: open ? 0.5 : 0,
          },
        ]}
      >
        <Text style={{ fontFamily: "open-sans", fontSize: 16 }}>Breakdown</Text>
        <AnimatedIcon
          size={27}
          color="black"
          name="chevron-down"
          style={{ transform: [{ rotate: iconRotation }] }}
        />
      </TouchableOpacity>
      <Animated.View style={{ width: "100%", height, overflow: "hidden" }}>
        {counters.map((item) => (
          <View
            key={item.id}
            style={{
              width: "100%",
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 12,
            }}
          >
            <Text>{item.title}</Text>
            <Text>{Math.round((item.value / total) * 100)}%</Text>
          </View>
        ))}
      </Animated.View>
      <CounterPicker
        visible={modalOpen}
        onDismiss={() => setModalOpen(false)}
        counterID={counterID}
        onChooseChildren={selectChildrenHandler}
        currChildren={currChildren}
      />
      {!isAndroid && (
        <InputAccessoryView nativeID={id_1} backgroundColor={"#dedede"}>
          <Button title="Done" onPress={() => Keyboard.dismiss()} />
        </InputAccessoryView>
      )}
    </View>
  );
};

export default Aggregator;
