import React from "react";
import { View, Text } from "react-native";
import DiceSettings from "./DiceSettings";
import CoinSettings from "./CoinSettings";
import LifePointSettings from "./LifePointSettings";

const Settings = (props) => {
  const { navigation, route } = props;
  const { lastScreen } = route.params;

  if (lastScreen === "Coin") {
    return <CoinSettings />;
  } else if (lastScreen === "Dice") {
    return <DiceSettings />;
  } else if (lastScreen === "Lifepoints") {
    return <LifePointSettings />;
  }

  return <DiceSettings />;
};

export default Settings;
