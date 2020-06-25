import React from "react";
import { View, ScrollView, FlatList, Text } from "react-native";
import { generateBracket } from "../../helpers/generateBracket";
const BracketView = (props) => {
  const bracket = [generateBracket(11)];
  const round1 = bracket[0];
  console.log(bracket);
  const _renderItem = ({ item }) => {
    const [home, away] = item;
    return (
      <View style={{ borderWidth: 2, width: 125, marginVertical: 16 }}>
        <View style={{ flexDirection: "row" }}>
          {home && <Text>{home.seed}</Text>}
          <Text>{home ? home.name : "--Bye--"}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {away && <Text>{away.seed}</Text>}
          <Text>{away ? away.name : "--Bye--"}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexDirection: "row" }}
      >
        <FlatList
          data={round1}
          renderItem={_renderItem}
          keyExtractor={(item, index) => "key" + index}
        />
      </ScrollView>
    </View>
  );
};

export default BracketView;

