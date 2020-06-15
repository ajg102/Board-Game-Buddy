import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";
import { styles, sizeCoins } from "./styles";

class Coin extends Component {
  constructor(props) {
    super(props);
    this.flip = new Animated.Value(0);
  }

  flipCoin = () => {
    this.flip.setValue(0);
    this.props.onStartFlip();
    Animated.sequence([
      Animated.timing(this.flip, {
        duration: 500,
        toValue: 4,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.spring(this.flip, {
        useNativeDriver: true,
        toValue: Math.floor(Math.random() * 2) === 0 ? 4 : 5,
      }),
    ]).start(() => {
      this.props.onFlipFinished();
    });
  };
  render() {
    const front = this.flip.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5],
      outputRange: ["0deg", "180deg", "360deg", "-180deg", "0deg", "180deg"],
    });
    const back = this.flip.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5],
      outputRange: ["180deg", "360deg", "-180deg", "0deg", "180deg", "360deg"],
    });
    return (
      <TouchableWithoutFeedback onPress={this.flipCoin}>
        <View>
          <Animated.View
            style={[
              styles.flipFront,
              sizeCoins(this.props.numCoins),
              { transform: [{ rotateX: front }] },
            ]}
          >
            <Text style={styles.labelStyle}>
              {this.props.numCoins > 4 ? "H" : "HEADS"}
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.flipFront,
              styles.backFlip,
              sizeCoins(this.props.numCoins),
              { transform: [{ rotateX: back }] },
            ]}
          >
            <Text style={styles.labelStyle}>
              {this.props.numCoins > 4 ? "T" : "TAILS"}
            </Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Coin;
