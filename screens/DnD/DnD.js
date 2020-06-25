import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  BackHandler,
} from "react-native";
import Die from "./Die";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

const DnD = (props) => {
  const [dieRefs, setDieRefs] = useState([]);
  const [numRolls, setNumRolls] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("roll");
  const [d4, setD4] = useState(0);
  const [d6, setD6] = useState(0);
  const [d8, setD8] = useState(0);
  const [d10, setD10] = useState(0);
  const [d12, setD12] = useState(0);
  const [d20, setD20] = useState(0);
  const [d100, setD100] = useState(0);

  useEffect(() => {
    const res = getResultTotal();
    setResult(res);
  }, [dieRefs.length]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (mode === "add") {
          setMode("roll");
          return true;
        } else return false;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [mode])
  );

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
      case "d100":
        setD100((prev) => prev + 1);
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
      case "d100":
        setD100((prev) => prev - 1);
      default:
        return;
    }
  };

  const rollHandler = () => {
    setIsRolling(true);
    const rolls = dieRefs.map((die) => die.ref.current.rollAsync());
    Promise.all(rolls)
      .then(() => {
        setResult(getResultTotal());
        setIsRolling(false);
      })
      .catch((err) => console.log(err));
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
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d4" />
              <Text style={styles.dieCountText}>{`${d4}d4`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d4")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="minus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.diceItemContainer}>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => addDieHandler("d6")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d6" />
              <Text style={styles.dieCountText}>{`${d6}d6`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d6")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="minus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.diceItemContainer}>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => addDieHandler("d8")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d8" />
              <Text style={styles.dieCountText}>{`${d8}d8`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d8")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="minus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.diceItemContainer}>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => addDieHandler("d10")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d10" />
              <Text style={styles.dieCountText}>{`${d10}d10`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d10")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="minus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.diceItemContainer}>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => addDieHandler("d12")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d12" />
              <Text style={styles.dieCountText}>{`${d12}d12`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d12")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="minus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.diceItemContainer}>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => addDieHandler("d20")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d20" />
              <Text style={styles.dieCountText}>{`${d20}d20`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d20")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="minus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.diceItemContainer}>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => addDieHandler("d100")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.dieItem}>
              <Die type="d100" />
              <Text style={styles.dieCountText}>{`${d100}d100`}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => removeDieHandler("d100")}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <MaterialCommunityIcons name="minus" size={30} color="white" />
              </LinearGradient>
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
        <Text style={styles.resultsText}>{!isRolling ? result : ""}</Text>
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
        <LinearGradient
          colors={["#FE6B8B", "#FF8E53"]}
          locations={[0.3, 0.9]}
          style={styles.buttonBackground}
        >
          <Text style={styles.buttonText}>
            {mode === "roll" ? "Roll" : "Done"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default DnD;
