import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  InputAccessoryView,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { styles } from "./styles";
import { Menu, Divider } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const id_1 = "a";

const isAndroid = Platform.OS === "android";

const COLORS = [
  "#F78DA7", //pink
  "#EB144C", //red
  "#FF6900", //orange
  "#FCB900", //gold
  "#7BDCB5", //teal
  "#00D084", //green
  "#8ED1FC", //light blue
  "#0693E3", //blue
  "#9900EF", //purple
  "#8B4513", //brown
  "#ABB8C3", //gray
  "black",
];

const LifePointSettings = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const p1Color = useSelector((state) => state.lifepoints.p1Color);
  const p2Color = useSelector((state) => state.lifepoints.p2Color);
  const baseScore = useSelector((state) => state.lifepoints.initialScore);
  const [color1MenuOpen, setColor1MenuOpen] = useState(false);
  const [color2MenuOpen, setColor2MenuOpen] = useState(false);
  const [color1, setColor1] = useState(p1Color);
  const [color2, setColor2] = useState(p2Color);
  const [score, setScore] = useState(baseScore);
  const [score_error, setScoreError] = useState(false);

  const changeColor1Handler = (val) => {
    setColor1(val);
    setColor1MenuOpen(false);
  };

  const changeColor2Handler = (val) => {
    setColor2(val);
    setColor2MenuOpen(false);
  };

  const onSaveHandler = () => {
    dispatch({
      type: "LIFEPOINTS:UPDATE_SETTINGS",
      p1Color: color1,
      p2Color: color2,
      initialScore: score,
    });
    navigation.goBack();
  };

  const onBlurHandler = () => {
    if (isNaN(score)) {
      setScoreError(true);
    } else {
      setScoreError(false);
      if (score !== baseScore) {
        alert(
          "You will need to reset your game for the changes to take effect."
        );
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.headerText}>SCORES</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.textLabel}>Initial Score</Text>
          <TextInput
            value={score}
            selectTextOnFocus={true}
            onChangeText={(val) => setScore(val)}
            keyboardType="numeric"
            inputAccessoryViewID={id_1}
            onBlur={onBlurHandler}
            style={[styles.input, score_error && styles.inputError]}
          />
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.headerText}>PLAYERS</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.textLabel}>Player 1 Color</Text>
          <Menu
            anchor={
              <TouchableOpacity
                style={[{ backgroundColor: color1 }, styles.penColorButton]}
                onPress={() => setColor1MenuOpen(true)}
              />
            }
            contentStyle={{ paddingBottom: 32 }}
            visible={color1MenuOpen}
            onDismiss={() => setColor1MenuOpen(false)}
          >
            <TouchableOpacity
              style={[
                { backgroundColor: color1, margin: 12 },
                styles.penColorButton,
              ]}
              onPress={() => setColor1MenuOpen(true)}
            />
            <Divider />
            {COLORS.map((item) => {
              if (color1 === item) return null;
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    { backgroundColor: item, margin: 12 },
                    styles.penColorButton,
                  ]}
                  onPress={() => changeColor1Handler(item)}
                />
              );
            })}
          </Menu>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.textLabel}>Player 2 Color</Text>
          <Menu
            anchor={
              <TouchableOpacity
                style={[{ backgroundColor: color2 }, styles.penColorButton]}
                onPress={() => setColor2MenuOpen(true)}
              />
            }
            contentStyle={{ paddingBottom: 32 }}
            visible={color2MenuOpen}
            onDismiss={() => setColor2MenuOpen(false)}
          >
            <TouchableOpacity
              style={[
                { backgroundColor: color2, margin: 12 },
                styles.penColorButton,
              ]}
              onPress={() => setColor2MenuOpen(true)}
            />
            <Divider />
            {COLORS.map((item) => {
              if (color2 === item) return null;
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    { backgroundColor: item, margin: 12 },
                    styles.penColorButton,
                  ]}
                  onPress={() => changeColor2Handler(item)}
                />
              );
            })}
          </Menu>
        </View>
        <View style={styles.sectionHeader} />
        <TouchableOpacity
          disabled={score_error}
          onPress={onSaveHandler}
          style={[styles.rowItem, { justifyContent: "center" }]}
        >
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
        <View style={{ height: 60 }} />
        {!isAndroid && (
          <InputAccessoryView nativeID={id_1} backgroundColor={"#dedede"}>
            <Button title="Done" onPress={() => Keyboard.dismiss()} />
          </InputAccessoryView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LifePointSettings;
