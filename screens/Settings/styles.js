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
    borderWidth: 1,
    borderColor: "#bbb",
  },
  labelStyle: {
    fontSize: 16,
    color: "black",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});
