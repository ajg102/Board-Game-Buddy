import React, { Component } from "react";
import {
  View,
  Animated,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { styles, dieFaceSet } from "./styles";
import * as Haptics from "expo-haptics";
import { Menu, Divider } from "react-native-paper";

const DIE_COLORS = [
  "white",
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "black",
  "#EB144C",
  "#F78DA7",
  "#9900EF",
];

class Die extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
    // this.animationDuration = new Animated.Value(0);
    // this.randomFaces = [
    //   Math.ceil(Math.random() * 6),
    //   Math.ceil(Math.random() * 6),
    //   Math.ceil(Math.random() * 6),
    //   Math.ceil(Math.random() * 6),
    // ];
  }
  state = {
    value: 6,
    isRolling: false,
    colorMenuOpen: false,
    color: "white",
  };

  onLongPressHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    this.setState({ colorMenuOpen: !this.state.colorMenuOpen });
  };

  closeMenuHandler = () => {
    this.setState({ colorMenuOpen: false });
  };

  changeDieColor = (color) => {
    this.setState({ color: color, colorMenuOpen: false });
  };

  rollDieAsync = () => {
    const promise = new Promise((resolve) => {
      this.setState({ isRolling: true });
      Animated.parallel([
        Animated.sequence([
          Animated.timing(this.animation, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(this.animation, {
            toValue: -10,
            duration: 75,
            useNativeDriver: true,
          }),
          Animated.timing(this.animation, {
            toValue: 10,
            duration: 30,
            useNativeDriver: true,
          }),
          Animated.timing(this.animation, {
            toValue: -10,
            duration: 30,
            useNativeDriver: true,
          }),
          Animated.timing(this.animation, {
            toValue: 10,
            duration: 30,
            useNativeDriver: true,
          }),
          Animated.timing(this.animation, {
            toValue: -10,
            duration: 30,
            useNativeDriver: true,
          }),
          Animated.timing(this.animation, {
            toValue: 10,
            duration: 75,
            useNativeDriver: true,
          }),
          Animated.timing(this.animation, {
            toValue: -10,
            duration: 125,
            useNativeDriver: true,
          }),
          Animated.timing(this.animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        const result = Math.ceil(Math.random() * 6);
        this.setState({ value: result, isRolling: false });
        resolve();
      });
    });
    return promise;
  };

  roll = () => {
    this.setState({ isRolling: true });
    Animated.parallel([
      Animated.sequence([
        Animated.timing(this.animation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(this.animation, {
          toValue: -10,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(this.animation, {
          toValue: 10,
          duration: 30,
          useNativeDriver: true,
        }),
        Animated.timing(this.animation, {
          toValue: -10,
          duration: 30,
          useNativeDriver: true,
        }),
        Animated.timing(this.animation, {
          toValue: 10,
          duration: 30,
          useNativeDriver: true,
        }),
        Animated.timing(this.animation, {
          toValue: -10,
          duration: 30,
          useNativeDriver: true,
        }),
        Animated.timing(this.animation, {
          toValue: 10,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(this.animation, {
          toValue: -10,
          duration: 125,
          useNativeDriver: true,
        }),
        Animated.timing(this.animation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      const result = Math.ceil(Math.random() * 6);
      this.setState({ value: result, isRolling: false });
    });
  };

  render() {
    return (
      <Menu
        visible={this.state.colorMenuOpen}
        onDismiss={this.closeMenuHandler}
        contentStyle={{ paddingBottom: 32 }}
        anchor={
          <TouchableWithoutFeedback
            hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
            onLongPress={this.onLongPressHandler}
          >
            <Animated.View
              style={[
                styles.dieContainer,
                {
                  transform: [
                    { translateX: this.animation },
                    { translateY: this.animation },
                  ],
                  backgroundColor: this.state.color,
                },
              ]}
            >
              {!this.state.isRolling && (
                <Image
                  source={dieFaceSet[this.state.value + ""]}
                  style={[
                    styles.dieFace,
                    {
                      tintColor:
                        this.state.color === "white" ? "black" : "white",
                    },
                  ]}
                />
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        }
      >
        <View
          style={[
            { backgroundColor: this.state.color, margin: 12 },
            styles.dieColorOption,
          ]}
        />
        <Divider />
        {DIE_COLORS.map((color) => {
          if (this.state.color === color) return null;
          return (
            <TouchableOpacity
              key={color}
              style={[
                { backgroundColor: color, margin: 12 },
                styles.dieColorOption,
              ]}
              onPress={() => this.changeDieColor(color)}
            />
          );
        })}
      </Menu>
    );
  }
}

export default Die;
