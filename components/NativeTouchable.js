import React from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

const NativeTouchable = (props) => {
  return Platform.OS === "android" ? (
    <TouchableNativeFeedback
      onPress={props.onPress}
      background={TouchableNativeFeedback.Ripple(
        props.rippleColor || "#aaa",
        false
      )}
    >
      <View style={props.style}>{props.children}</View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      {props.children}
    </TouchableOpacity>
  );
};

export default NativeTouchable;
