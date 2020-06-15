import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

export default NativeTouchable = (props) => {
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
