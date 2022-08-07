import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Die from "./Die";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";

const DiceRoll = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const defaultColor = useSelector(
    (state) => state.settings.diceRoll.defaultColor
  );
  const [numDie, setNumDie] = useState([React.createRef()]);
  const [total, setTotal] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item iconName="plus" title="add" onPress={addDie} />
          <Item iconName="minus" title="subtract" onPress={subtractDie} />
          <Item
            iconName="settings"
            title="settings"
            onPress={openDiceSettings}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, numDie]);

  useEffect(() => {
    const result = getResultTotal();
    setTotal(result);
  }, [numDie]);

  const addDie = () => {
    setNumDie((prev) => [...prev, React.createRef()]);
  };

  const subtractDie = () => {
    if (numDie.length === 1) return;
    const data = [...numDie];
    data.splice(0, 1);
    setNumDie(data);
  };

  const openDiceSettings = () => {
    navigation.navigate("Settings", { lastScreen: "Dice" });
  };

  const rollAll = () => {
    setIsRolling(true);
    const rolls = numDie.map((ref) => ref.current.rollDieAsync());
    Promise.all(rolls)
      .then(() => {
        const total = getResultTotal();
        const results = getResults();
        setTotal(total);
        setIsRolling(false);
        dispatch({
          type: "HISTORY:ADD",
          key: "diceRoll",
          record: { total, results, created: Date.now() },
        });
      })
      .catch((err) => console.log(err));
  };

  const getResultTotal = () => {
    let total = 0;
    for (var i = 0; i < numDie.length; i++) {
      total +=
        numDie[i].current.state.value > 0 ? numDie[i].current.state.value : 0;
    }
    return total;
  };

  const getResults = () => {
    let res = [];
    for (var i = 0; i < numDie.length; i++) {
      res.push(numDie[i].current.state.value);
    }
    return res;
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>Result Total:</Text>
        <Text style={styles.resultsText}>{!isRolling ? total : ""}</Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {numDie.map((itemRef, index) => (
          <Die ref={itemRef} key={`${index}`} color={defaultColor} />
        ))}
        <View style={{ height: 100, width: "100%" }} />
      </ScrollView>
      <View style={{ height: 96, width: "100%" }}>
        {!isRolling && (
          <TouchableOpacity onPress={rollAll} style={styles.button}>
            <LinearGradient
              colors={["#FE6B8B", "#FF8E53"]}
              locations={[0.3, 0.9]}
              style={styles.buttonBackground}
            >
              <Text style={styles.buttonText}>ROLL ALL</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default DiceRoll;
