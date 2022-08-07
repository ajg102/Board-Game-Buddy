import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  gameModePicker: {
    width: "95%",
    height: 56,
    borderBottomWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "rgba(174, 174, 174, .6)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 16,
  },
  gameModePickerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
  },
  cricketHeaderText: {
    fontSize: 20,
    fontWeight: "700",
  },
  dartImageContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  dartImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginHorizontal: 6,
  },
  teamHeader: {
    height: "100%",
    width: width * 0.5,
    borderBottomWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cricketScoreRowItem: {
    flexDirection: "row",
    width: "100%",
    height: 80,
    //borderWidth: 1,
    marginVertical: 8,
  },
  cricketScoreButton: {
    width: "40%",
    //borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scorePickerButton: {
    width: width * 0.25,
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
    paddingHorizontal: 4,
  },
  cricketMissButton: {
    width: "50%",
    alignSelf: "center",
    height: 50,
    borderRadius: 8,
    overflow: "hidden",
  },
  cricketMissButtonBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  cricketMissButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
