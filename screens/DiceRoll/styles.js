import { StyleSheet, Dimensions } from "react-native";
import { size } from "../../helpers/normalize";

export const styles = StyleSheet.create({
  dieContainer: {
    width: size(64),
    height: size(64),
    borderRadius: size(8),
    margin: 16,
    backgroundColor: "white",
  },
  dieFace: { resizeMode: "cover", width: "100%", height: "100%" },
  container: {
    flex: 1,
    margin: 8,
    alignItems: "center",
  },
  rollButton: {
    width: Dimensions.get("screen").width * 0.9,
    height: size(48),
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    letterSpacing: 1.5,
    fontWeight: "bold",
  },
  resultsContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 24,
  },
  resultsText: {
    fontWeight: "bold",
    fontSize: 26,
    color: "black",
  },
});

export const dieFaceSet = {
  "1": require("../../assets/dice_1.png"),
  "2": require("../../assets/dice_2.png"),
  "3": require("../../assets/dice_3.png"),
  "4": require("../../assets/dice_4.png"),
  "5": require("../../assets/dice_5.png"),
  "6": require("../../assets/dice_6.png"),
};
