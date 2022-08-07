import React, { Component } from "react";
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  Easing,
  Image,
} from "react-native";
import { styles, sizeCoins, coinFaceSets } from "./styles";

class Coin extends Component {
  constructor(props) {
    super(props);
    this.flip = new Animated.Value(0);
  }

  state = {
    value: -1, //0 = heads, 1= tails,
    //set: "og",
    hasFlipped: false,
    isFlipping: false,
  };

  flipCoinAsync = async () => {
    this.setState({ isFlipping: true });
    const promise = new Promise((resolve) => {
      this.flip.setValue(0);
      this.props.onStartFlip();
      const headsOrTails = Math.floor(Math.random() * 2);
      Animated.timing(this.flip, {
        duration: 650,
        toValue: headsOrTails === 0 ? 6 : 7,
        easing: Easing.bezier(0.645, 0.045, 0.355, 1),
        useNativeDriver: true,
      }).start(() => {
        this.setState({
          value: headsOrTails,
          hasFlipped: true,
          isFlipping: false,
        });
        //this.props.onFlipFinished();
        resolve();
      });
    });
    return promise;
  };

  flipCoin = () => {
    this.setState({ isFlipping: true });
    this.flip.setValue(0);
    this.props.onStartFlip();
    const headsOrTails = Math.floor(Math.random() * 2);
    Animated.timing(this.flip, {
      duration: 650,
      toValue: headsOrTails === 0 ? 6 : 7,
      easing: Easing.bezier(0.645, 0.045, 0.355, 1),
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        value: headsOrTails,
        hasFlipped: true,
        isFlipping: false,
      });
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
      <TouchableWithoutFeedback
        disabled={this.state.isFlipping}
        onPress={this.flipCoin}
      >
        <View>
          <Animated.View
            style={[
              styles.flipFront,
              sizeCoins(this.props.numCoins),
              {
                transform: [{ rotateX: front }],
                opacity:
                  this.state.hasFlipped || this.state.isFlipping ? 1 : 0.4,
              },
            ]}
          >
            <Image
              source={coinFaceSets[this.props.face].heads}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.flipFront,
              styles.backFlip,
              sizeCoins(this.props.numCoins),
              { transform: [{ rotateX: back }] },
            ]}
          >
            <Image
              source={coinFaceSets[this.props.face].tails}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Coin;
