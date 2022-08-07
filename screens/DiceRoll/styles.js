import { StyleSheet, Dimensions } from "react-native";
import { size } from "../../helpers/normalize";

export const styles = StyleSheet.create({
  dieContainer: {
    width: size(64),
    height: size(64),
    borderRadius: size(8),
    margin: 16,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  dieFace: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  dieColorOption: {
    width: 36,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#eee",
  },
  container: {
    flex: 1,
    margin: 8,
    alignItems: "center",
  },
  button: {
    width: "90%",
    height: 56,
    alignSelf: "center",
    borderRadius: 8,
    zIndex: 2000,
    overflow: "hidden",
  },
  buttonBackground: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1.2,
    fontFamily: "open-sans-bold",
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
    fontFamily: "open-sans-bold",
  },
});

export const dieFaceSet = {
  "-1": require("../../assets/dice_1.png"),
  "1": require("../../assets/dice_1.png"),
  "2": require("../../assets/dice_2.png"),
  "3": require("../../assets/dice_3.png"),
  "4": require("../../assets/dice_4.png"),
  "5": require("../../assets/dice_5.png"),
  "6": require("../../assets/dice_6.png"),
};
