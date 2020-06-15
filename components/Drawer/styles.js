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
  labelStyle: {
    fontSize: 16,
    color: "black",
  },
  divider: {
    height: 0,
    width: "100%",
    borderWidth: 1,
    borderColor: "#bbb",
  },
});
