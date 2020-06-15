import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Die from "./Die";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";

const DiceRoll = (props) => {
  const { navigation } = props;
  const [numDie, setNumDie] = useState([React.createRef()]);
  const [total, setTotal] = useState("");
  const [numRolls, setNumRolls] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item iconName="plus" title="add" onPress={addDie} />
          <Item iconName="minus" title="subtract" onPress={subtractDie} />
        </HeaderButtons>
      ),
    });
  }, [navigation, numDie]);

  useEffect(() => {
    const result = getResultTotal();
    setTotal(result);
  }, [numRolls]);

  const addDie = () => {
    setNumDie((prev) => [...prev, React.createRef()]);
  };

  const subtractDie = () => {
    if (numDie.length === 1) return;
    const data = [...numDie];
    data.splice(0, 1);
    setNumDie(data);
  };

  const rollAll = () => {
    setIsRolling(true);
    numDie.forEach((ref) => {
      ref.current.roll();
    });
    setTimeout(() => {
      setNumRolls((prev) => prev + 1);
      setIsRolling(false);
    }, 300);
  };

  const getResultTotal = () => {
    let total = 0;
    for (var i = 0; i < numDie.length; i++) {
      total += numDie[i].current.state.value;
    }
    return total;
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>Result Total:</Text>
        <Text style={styles.resultsText}>{!isRolling ? total : ""}</Text>
      </View>

      <TouchableOpacity onPress={rollAll}>
        <LinearGradient
          colors={["#FE6B8B", "#FF8E53"]}
          locations={[0.3, 0.9]}
          style={styles.rollButton}
        >
          <Text style={styles.buttonText}>ROLL ALL</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {numDie.map((itemRef, index) => (
            <Die ref={itemRef} key={`${index}`} />
          ))}
        </ScrollView>
        <View style={{ height: 60 }} />
      </View>
    </View>
  );
};

export default DiceRoll;
