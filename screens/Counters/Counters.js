import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "react-native-paper";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import Counter from "../../components/Counter/Counter";
import Aggregator from "../../components/Counter/Aggregator";
import { styles } from "./styles";

const Counters = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const active_counters = useSelector((state) => state.counters.counters);
  const [open, setOpen] = useState(false);

  //console.log(active_counters);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Menu
            visible={open}
            onDismiss={() => setOpen(false)}
            anchor={
              <Item
                iconName="plus"
                title="ADD"
                onPress={() => setOpen((prev) => !prev)}
              />
            }
          >
            <Menu.Item
              title="Simple Counter"
              onPress={() => {
                dispatch({
                  type: "COUNTERS:ADD",
                  counter: {
                    id: Math.random().toString(36).substr(2, 9),
                    title: "New Counter",
                    value: 0,
                    increment: 1,
                    increment_1: 1,
                    increment_2: 3,
                    increment_3: 5,
                    increment_4: 10,
                    type: "simple",
                    parents: [],
                  },
                });
                setOpen(false);
              }}
            />
            <Menu.Item
              title="Aggregator"
              onPress={() => {
                dispatch({
                  type: "COUNTERS:ADD",
                  counter: {
                    id: Math.random().toString(36).substr(2, 9),
                    title: "New Aggregator",
                    type: "agg",
                    parents: [],
                    children: [],
                  },
                });
                setOpen(false);
              }}
            />
          </Menu>
        </HeaderButtons>
      ),
    });
  }, [navigation, dispatch, open]);

  const deleteCounterHandler = (id) => {
    Alert.alert(
      "Delete Counter",
      "Are you sure you want to delete this counter?",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: () => dispatch({ type: "COUNTERS:REMOVE", id }),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const _renderItem = ({ item }) => {
    if (item.type === "agg") {
      return (
        <Aggregator
          counterID={item.id}
          counterLable={item.title}
          counterLable={item.title}
          onRemoveCounter={deleteCounterHandler}
          currChildren={item.children}
        />
      );
    } else {
      return (
        <Counter
          counterLable={item.title}
          counterValue={item.value}
          counterID={item.id}
          onRemoveCounter={deleteCounterHandler}
          incrementValue={item.increment}
          increment_1={item.increment_1}
          increment_2={item.increment_2}
          increment_3={item.increment_3}
          increment_4={item.increment_4}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareFlatList
        style={{ flex: 1 }}
        data={active_counters}
        keyExtractor={(item) => item.id}
        renderItem={_renderItem}
        ListFooterComponent={() => <View style={{ height: 60 }} />}
      />
    </View>
  );
};

export default Counters;
