import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./styles";
import { Modal, Card, Button, Portal } from "react-native-paper";
import CardBackground from "../../assets/trophy.png";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";

const BracketList = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const brackets = useSelector((state) => state.brackets.brackets);

  useEffect(() => {
    dispatch({ type: "BRACKETS:RESET" });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item iconName="plus" iconSize={30} onPress={createBracketHandler} />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const _renderItem = ({ item }) => (
    <Card
      style={{ marginVertical: 4 }}
      onPress={() => openBracketHandler(item.id)}
    >
      <Card.Title title={item.title} subtitle={item.subtitle} />
      <Card.Cover
        style={{ resizeMode: "contain" }}
        source={item.image ? { uri: item.image } : CardBackground}
      />
      <Card.Actions>
        <Button color="#FE6B8B">Edit</Button>
        <Button color="#FE6B8B" onPress={() => deleteBracketHandler(item.id)}>
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );

  const openBracketHandler = (id) => {
    const bracket = brackets.find((item) => item.id === id);
    navigation.navigate("bracket_view", { bracket: bracket });
  };

  const createBracketHandler = () => {
    navigation.navigate("bracket_add");
  };

  const deleteBracketHandler = (id) => {
    Alert.alert(
      "Delete Bracket",
      "Are you sure you want to permanently delete this bracket?",
      [
        {
          text: "Yes",
          onPress: () => dispatch({ type: "BRACKETS:DELETE", id: id }),
        },
        { text: "No", style: "cancel" },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={brackets}
        renderItem={_renderItem}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

export default BracketList;
