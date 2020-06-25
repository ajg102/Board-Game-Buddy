import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  scores: {
    width: "100%",
    height: 139,
    alignItems: "center",
    flexDirection: "row",
  },
  entry: {
    width: "100%",
    height: 75,
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(46, 204, 113, .8)",
    position: "absolute",
    top: 0,
  },
});
