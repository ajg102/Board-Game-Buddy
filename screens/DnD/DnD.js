import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import Die from "./Die";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DnD = (props) => {
  const [dieRefs, setDieRefs] = useState([]);
  const [numRolls, setNumRolls] = useState(0);
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("roll");
  const [d4, setD4] = useState(0);
  const [d6, setD6] = useState(0);
  const [d8, setD8] = useState(0);
  const [d10, setD10] = useState(0);
  const [d12, setD12] = useState(0);
  const [d20, setD20] = useState(0);

  useEffect(() => {
    const res = getResultTotal();
    setResult(res);
  }, [numRolls, dieRefs.length]);

  const modeChangeHandler = () => {
    if (mode === "roll") {
      setMode("add");
      Animated.spring(scrollAnimation.current, {
        useNativeDriver: true,
        toValue: 1,
      }).start(() => {});
    } else {
      setMode("roll");
      Animated.spring(scrollAnimation.current, {
        useNativeDriver: true,
        toValue: 0,
      }).start(() => {});
    }
  };

  const addDieHandler = (type) => {
    setDieRefs((prev) => [...prev, { ref: React.createRef(), type }]);
    switch (type) {
      case "d4":
        setD4((prev) => prev + 1);
        break;
      case "d6":
        setD6((prev) => prev + 1);
        break;
      case "d8":
        setD8((prev) => prev + 1);
        break;
      case "d10":
        setD10((prev) => prev + 1);
        break;
      case "d12":
        setD12((prev) => prev + 1);
        break;
      case "d20":
        setD20((prev) => prev + 1);
        break;
      default:
        return;
    }
  };

  const removeDieHandler = (type) => {
    const data = [...dieRefs];
    const index = data.findIndex((item) => item.type === type);
    if (index < 0) return;
    data.splice(index, 1);
    setDieRefs(data);
    switch (type) {
      case "d4":
        setD4((prev) => prev - 1);
        break;
      case "d6":
        setD6((prev) => prev - 1);
        break;
      case "d8":
        setD8((prev) => prev - 1);
        break;
      case "d10":
        setD10((prev) => prev - 1);
        break;
      case "d12":
        setD12((prev) => prev - 1);
        break;
      case "d20":
        setD20((prev) => prev - 1);
        break;
      default:
        return;
    }
  };

  const rollHandler = () => {
    dieRefs.forEach((die) => {
      die.ref.current.roll();
    });
    setTimeout(() => {
      setNumRolls((prev) => prev + 1);
    }, 300);
  };

  const getResultTotal = () => {
    let total = 0;
    for (var i = 0; i < dieRefs.length; i++) {
      total += dieRefs[i].ref.current.state.value;
    }
    return total;
  };

  const scrollAnimation = useRef(new Animated.Value(0));
  const translateY = scrollAnimation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get("screen").height + 10, 0],
  });
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [{ translateY: translateY }],
          },
        ]}
      >
        <ScrollView
          overScrollMode="never"
          bounces={false}
          contentContainerStyle={styles.diceContainer}
        >
          <View style={styles.diceItemContainer}>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => addDieHandler("d4")}
            >
              <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d4" />
              <Text style={styles.dieCountText}>{`${d4}d4`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d4")}
            >
              <MaterialCommunityIcons name="minus" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.diceItemContainer}>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => addDieHandler("d6")}
            >
              <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d6" />
              <Text style={styles.dieCountText}>{`${d6}d6`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d6")}
            >
              <MaterialCommunityIcons name="minus" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.diceItemContainer}>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => addDieHandler("d8")}
            >
              <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d8" />
              <Text style={styles.dieCountText}>{`${d8}d8`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d8")}
            >
              <MaterialCommunityIcons name="minus" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.diceItemContainer}>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => addDieHandler("d10")}
            >
              <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d10" />
              <Text style={styles.dieCountText}>{`${d10}d10`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d10")}
            >
              <MaterialCommunityIcons name="minus" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.diceItemContainer}>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => addDieHandler("d12")}
            >
              <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d12" />
              <Text style={styles.dieCountText}>{`${d12}d12`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d12")}
            >
              <MaterialCommunityIcons name="minus" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.diceItemContainer}>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => addDieHandler("d20")}
            >
              <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d20" />
              <Text style={styles.dieCountText}>{`${d20}d20`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d20")}
            >
              <MaterialCommunityIcons name="minus" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ height: 150 }} />
        </ScrollView>
      </Animated.View>
      <TouchableOpacity
        onPress={modeChangeHandler}
        style={styles.selectDiceButton}
      >
        <View style={styles.selectDieContainer}>
          <Die type="d4" />
          <Die type="d6" />
          <Die type="d8" />
          <Die type="d10" />
          <Die type="d12" />
          <Die type="d20" />
        </View>
        <Text style={styles.selectDiceText}>Select Dice</Text>
      </TouchableOpacity>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>Result:</Text>
        <Text style={styles.resultsText}>{result}</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {dieRefs.map((die, index) => {
          return <Die key={`${index}`} type={die.type} ref={die.ref} />;
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={mode === "roll" ? rollHandler : modeChangeHandler}
      >
        <Text style={styles.buttonText}>
          {mode === "roll" ? "Roll" : "Done"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DnD;
