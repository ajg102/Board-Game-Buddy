import { StyleSheet } from "react-native";
import { size } from "../../helpers/normalize";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: size(50),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  editIconButton: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  labelStyle: {
    fontSize: 16,
    color: "white",
    fontFamily: "open-sans-bold",
  },
  divider: {
    height: 0,
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
  },
  gradientBg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
