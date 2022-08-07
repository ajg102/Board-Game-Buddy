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

class Die extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
  }
  state = {
    value: -1,
    isRolling: false,
    colorMenuOpen: false,
    color: "white",
    hasRolled: false,
  };

  componentDidMount = () => {
    this.setState({ color: this.props.color });
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
        this.setState({ value: result, isRolling: false, hasRolled: true });
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
      this.setState({ value: result, isRolling: false, hasRolled: true });
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
                  opacity:
                    this.state.hasRolled || this.state.isRolling ? 1 : 0.4,
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
