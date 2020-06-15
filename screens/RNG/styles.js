import { StyleSheet, Dimensions } from "react-native";
import { size } from "../../helpers/normalize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 16,
  },
  input: {
    marginHorizontal: 16,
    width: "50%",
    height: size(48),
    fontSize: 20,
    textAlignVertical: "center",
    textAlign: "center",
  },
  plusButton: {
    width: size(35),
    height: size(35),
    borderRadius: size(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
    marginHorizontal: 12,
  },
  minusButton: {
    width: size(35),
    height: size(35),
    borderRadius: size(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#aaa",
    marginHorizontal: 12,
  },
  generateButton: {
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
    width: "90%",
    padding: 16,
    flexDirection: "row",
    marginVertical: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  result: {
    fontSize: 36,
    color: "black",
    margin: 16,
    fontWeight: "bold",
  },
});
