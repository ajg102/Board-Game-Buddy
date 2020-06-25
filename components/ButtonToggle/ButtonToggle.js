import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

const ButtonToggle = ({
  containerStyle = {},
  items = [],
  onItemSelected = () => {},
  selectedValue,
  buttonStyle = {},
  labelStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {items.map((item, index) => (
        <TouchableOpacity
          style={[
            styles.button,
            buttonStyle,
            // {
            //   backgroundColor:
            //     item.value === selectedValue
            //       ? "blue"
            //       : styles.button.backgroundColor,
            // },
          ]}
          key={`${index}`}
          onPress={() => onItemSelected(item.value)}
        >
          {item.value === selectedValue && (
            <LinearGradient
              colors={["#FE6B8B", "#FF8E53"]}
              locations={[0.3, 0.9]}
              style={styles.gradient}
            />
          )}
          <Text
            style={[
              styles.text,
              labelStyle,
              {
                color:
                  item.value === selectedValue ? "white" : styles.text.color,
                fontWeight:
                  item.value === selectedValue
                    ? "bold"
                    : styles.text.fontWeight,
              },
            ]}
            numberOfLines={1}
            lineBreakMode="tail"
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ButtonToggle;
