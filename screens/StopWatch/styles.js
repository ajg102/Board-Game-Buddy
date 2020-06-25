import { Dimensions, StyleSheet } from "react-native";

const screen = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timerContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  msText: {
    fontSize: 36,
    width: 64,
    height: "100%",
    //borderWidth: 2,
    textAlign: "left",
    paddingTop: 28,
    position: "relative",
    fontFamily: "open-sans-bold",
  },
  buttonBackground: {
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
  },

  button: {
    borderWidth: 10,
    borderColor: "#B9AAFF",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  gradient: {
    width: screen.width / 2 + 10,
    height: screen.width / 2 + 10,
    borderRadius: screen.width / 2 + 10,
    overflow: "hidden",
    margin: 10,
  },
  button2: {
    width: screen.width / 2 - 10,
    height: screen.width / 2 - 10,
    borderRadius: screen.width / 2 - 10,
    backgroundColor: "white",
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 45,
    color: "#B9AAFF",
    zIndex: 100,
    fontFamily: "open-sans-bold",
  },
  timerText: {
    //color: "#fff",
    color: "black",
    fontSize: 64,
    //marginBottom: 20,
    fontFamily: "open-sans-bold",
  },
  buttonReset: {
    marginTop: 20,
    borderColor: "#FF851B",
  },
  buttonTextReset: {
    color: "#FF851B",
    zIndex: 100,
  },
});
