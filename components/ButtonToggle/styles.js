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
    borderColor: "blue",
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
    color: "blue",
    fontWeight: "normal",
  },
});
