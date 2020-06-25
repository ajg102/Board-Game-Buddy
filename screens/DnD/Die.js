import React, { Component } from "react";
import { View, Text, Animated, Image } from "react-native";
import { styles, dieFaceSet } from "./styles";

class Die extends Component {
  constructor(props) {
    super(props);
    this.dieType = Types.find((die) => die.type === this.props.type);
    this.dieStyles = this.props.dieStyle || {};
    this.animation = new Animated.Value(0);
  }
  state = {
    value: null,
    isRolling: false,
  };

  componentDidUpdate = () => {
    this.dieType = Types.find((die) => die.type === this.props.type);
  };

  rollAsync = () => {
    const promise = new Promise((resolve) => {
      this.setState({ isRolling: true });
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
      ]).start(() => {
        const result = Math.ceil(Math.random() * this.dieType.maxValue);
        this.setState({ value: result, isRolling: false });
        resolve();
      });
    });
    return promise;
  };

  roll = () => {
    this.setState({ isRolling: true });
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
    ]).start(() => {
      const result = Math.ceil(Math.random() * this.dieType.maxValue);
      this.setState({ value: result, isRolling: false });
    });
  };

  render() {
    return (
      <Animated.View
        style={[
          styles.die,
          this.dieStyles,
          {
            transform: [{ translateX: this.animation }],
          },
        ]}
      >
        {this.state.value && !this.state.isRolling && (
          <Text style={styles.diceValue}>{this.state.value}</Text>
        )}
        <Image
          style={[styles.image, { opacity: this.state.value ? 0.6 : 1 }]}
          source={dieFaceSet[this.dieType.type]}
        />
      </Animated.View>
    );
  }
}

export default Die;

const Types = [
  { type: "d4", maxValue: 4 },
  { type: "d6", maxValue: 6 },
  { type: "d8", maxValue: 8 },
  { type: "d10", maxValue: 10 },
  { type: "d12", maxValue: 12 },
  { type: "d20", maxValue: 20 },
  { type: "d100", maxValue: 100 },
];
