import { StyleSheet } from "react-native";
import { size } from "../../helpers/normalize";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    flex: 1,
  },
  flipFront: {
    margin: 12,
    //backgroundColor: "blue",
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 5,
    //borderColor: "#aaa",
    shadowColor: "black",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    //elevation: 5,
  },
  backFlip: {
    //backgroundColor: "red",
    //borderColor: "#eee",
    position: "absolute",
    top: 0,
  },
  labelStyle: {
    fontSize: 28,
    color: "white",
    letterSpacing: 1.5,
    fontWeight: "bold",
  },
  coins: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
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

export const sizeCoins = (num) => {
  let height = size(200);
  let width = size(200);
  let borderRadius = size(150);
  if (num <= 2) {
    //leave sizes alone
  } else if (num > 2 && num <= 4) {
    height = size(150);
    width = size(150);
    borderRadius = size(100);
  } else if (num > 4 && num <= 6) {
    height = size(100);
    width = size(100);
    borderRadius = size(50);
  } else {
    height = size(100);
    width = size(100);
    borderRadius = size(50);
  }
  return {
    height,
    width,
    borderRadius,
  };
};

export const coinFaceSets = {
  og: {
    title: "Standard Coin",
    heads: require("../../assets/coin_faces/heads-og.png"),
    tails: require("../../assets/coin_faces/tails-og.png"),
  },
  basic: {
    title: "Blue and Red",
    heads: require("../../assets/coin_faces/heads-basic.png"),
    tails: require("../../assets/coin_faces/tails-basic.png"),
  },
};
