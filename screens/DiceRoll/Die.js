import React, { Component } from "react";
import { View, Animated, Image, TouchableWithoutFeedback } from "react-native";
import { styles, dieFaceSet } from "./styles";

class Die extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
  }
  state = {
    value: 6,
    isRolling: false,
  };

  roll = () => {
    this.setState({ isRolling: true });
    Animated.sequence([
      Animated.timing(this.animation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(this.animation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(this.animation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const result = Math.ceil(Math.random() * 6);
      this.setState({ value: result, isRolling: false });
    });
  };

  render() {
    // const shakingDiceFace = this.animation.interpolate({
    //   inputRange: [-10, 0, 10],
    //   outputRange: [],
    // });
    return (
      // <TouchableWithoutFeedback onPress={this.roll}>
      <Animated.View
        style={[
          styles.dieContainer,
          { transform: [{ translateX: this.animation }] },
        ]}
      >
        {!this.state.isRolling && (
          <Image
            source={dieFaceSet[this.state.value + ""]}
            style={styles.dieFace}
          />
        )}
      </Animated.View>
      // </TouchableWithoutFeedback>
    );
  }
}

export default Die;
