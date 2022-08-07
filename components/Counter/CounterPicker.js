import React, { useState, useEffect } from "react";
import { Portal, Modal } from "react-native-paper";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";

const LIST_ITEM_HEIGHT = 56;

const CounterPicker = ({
  visible = false,
  onDismiss,
  counterID = "",
  onChooseChildren,
  currChildren = [],
}) => {
  const [selected, setSelected] = useState([]);
  const counters = useSelector((state) => state.counters.counters).filter(
    (item) => item.id !== counterID
  );

  useEffect(() => {
    setSelected(currChildren);
  }, [currChildren]);

  const _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => itemSelectedHandler(item.id)}
      style={{
        width: "100%",
        height: LIST_ITEM_HEIGHT,
        backgroundColor: selected.includes(item.id) ? "#FF8E53" : "#fff",
        flexDirection: "row",
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          color: selected.includes(item.id) ? "#fff" : "#000",
          fontWeight: "bold",
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          color: selected.includes(item.id) ? "#fff" : "#000",
          fontWeight: "bold",
        }}
      >
        {item.value}
      </Text>
    </TouchableOpacity>
  );

  const itemSelectedHandler = (id) => {
    const data = [...selected];
    if (data.includes(id)) {
      const index = data.findIndex((item) => item === id);
      if (index < 0) return;
      data.splice(index, 1);
    } else {
      data.push(id);
    }
    setSelected(data);
  };

  const _renderSeperator = () => (
    <View
      style={{
        height: 0,
        width: "100%",
        borderWidth: 0.75,
        borderColor: "#FE6B8B",
      }}
    />
  );

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} dismissable={false}>
        <View
          style={{
            width: "90%",
            height: LIST_ITEM_HEIGHT * counters.length + 100,
            maxHeight: "90%",
            backgroundColor: "#fff",
            alignSelf: "center",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <FlatList
            style={{ flex: 1 }}
            data={counters}
            ItemSeparatorComponent={_renderSeperator}
            renderItem={_renderItem}
          />
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderTopWidth: 0.5,
              height: 28,
              backgroundColor: "#eee",
              borderColor: "#FF8E53",
            }}
          >
            <Text
              style={{ color: "blue", fontFamily: "open-sans", fontSize: 15 }}
            >
              {selected.length} selected
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 44,
              flexDirection: "row",
              alignItems: "center",
              borderTopWidth: 0.5,
              borderColor: "#FF8E53",
            }}
          >
            <TouchableOpacity
              style={{
                width: "50%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 0.5,
                backgroundColor: "#eee",
                borderColor: "#FF8E53",
              }}
              onPress={() => {
                setSelected(currChildren);
                onDismiss();
              }}
            >
              <Text
                style={{ fontSize: 18, fontFamily: "open-sans", color: "blue" }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#eee",
              }}
              onPress={() => onChooseChildren(selected)}
            >
              <Text
                style={{ fontSize: 18, fontFamily: "open-sans", color: "blue" }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default CounterPicker;
