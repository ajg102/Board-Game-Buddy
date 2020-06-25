import React, { useEffect } from "react";
import { View, Text } from "react-native";
import BracketView from "../../components/Bracket/BracketView";
import { generateBracket } from "../../helpers/generateBracket";

const Bracket = ({ navigation, route }) => {
  const { params } = route;
  const { bracket } = params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: bracket.title,
    });
  }, [bracket]);
  return <BracketView />;
};

export default Bracket;

// [
//   [1, null],
//   [9, 8],
//   [5, null],
//   [null, 4],
//   [3, null],
//   [null, 6],
//   [7, 10],
//   [null, 2],
// ];
