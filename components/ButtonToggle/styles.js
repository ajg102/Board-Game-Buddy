import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FE6B8B",
    backgroundColor: "white",
    alignSelf: "center",
    margin: 8,
    elevation: 5,
    // shadowColor: "black",
    // shadowOffset: { width: 2, height: 4 },
    // shadowOpacity: 0.8,
    // shadowRadius: 5,
  },
  button: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FE6B8B",
    fontWeight: "normal",
    fontFamily: "open-sans-bold",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    borderRadius: 4,
  },
});
