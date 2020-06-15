import { StyleSheet } from "react-native";
import { size } from "../../helpers/normalize";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeLimit: {
    width: "100%",
    height: "25%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  timeText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  divider: {
    width: "90%",
    height: 0,
    borderWidth: 0.5,
    borderColor: "#aaa",
    alignSelf: "center",
  },
  startButton: {
    alignSelf: "center",
    width: size(50),
    height: size(50),
    borderRadius: size(25),
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: size(48),
    elevation: 5,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.8,
    shadowOffset: { width: 3, height: 5 },
  },
  footer: {
    position: "absolute",
    bottom: 0,
    height: size(66),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 1,
  },
  footerButton: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footerButtonText: {
    opacity: 0.87,
    fontSize: 16,
    fontWeight: "bold",
  },
});