import { StyleSheet, Dimensions } from "react-native";
import { size } from "../../helpers/normalize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowItem: {
    width: "100%",
    height: size(50),
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    height: 0,
    width: "100%",
    borderWidth: 0.25,
    borderColor: "orange",
  },
  labelStyle: {
    fontSize: 16,
    color: "black",
    fontFamily: "open-sans",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    opacity: 0.87,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontFamily: "open-sans-extra-bold",
  },
});
