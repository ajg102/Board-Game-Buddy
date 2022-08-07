import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { styles } from "./styles";
import { Menu, Divider, Modal, Portal } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { sortByTime } from "../../helpers/sortByTime";
import { useNavigation } from "@react-navigation/native";
import { coinFaceSets } from "../CoinFlip/styles";

const CoinSettings = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const { coinFace, history } = useSelector((state) => state.settings.coinFlip);
  const [face, setFace] = useState(coinFace);
  const coinFaceOptions = Object.keys(coinFaceSets).map((item) => {
    return {
      title: coinFaceSets[item].title,
      heads: coinFaceSets[item].heads,
      tails: coinFaceSets[item].tails,
      key: item,
    };
  });
  const toggleModal = () => {
    setVisible((prev) => !prev);
  };

  const clearHistoryHandler = () => {
    Alert.alert(
      "Clear History",
      "Would you like to clear your history? It will be permanently removed from your device.",
      [
        {
          text: "Yes",
          style: "destructive",
          onPress: () => dispatch({ type: "HISTORY:CLEAR", key: "coinFlip" }),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const _renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text
        numberOfLines={1}
        ellipsizeMode={"middle"}
        style={styles.historyItemText}
      >
        {item.results} - {moment(item.created).fromNow()}
      </Text>
    </View>
  );

  const _renderCoinItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => changeCoinFaceHandler(item.key)}
      style={{
        width: "100%",
        marginVertical: 4,
        padding: 12,
        borderRadius: 8,
        backgroundColor: item.key === face ? "#15b9d5" : "white",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={item.heads}
          style={{ resizeMode: "contain", width: 80, height: 80 }}
        />
        <Image
          source={item.tails}
          style={{ resizeMode: "contain", width: 80, height: 80 }}
        />
      </View>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  const changeCoinFaceHandler = (val) => {
    setFace(val);
    toggleModal();
  };

  const onSaveHandler = () => {
    dispatch({ type: "COIN:SET_COIN_FACE", face: face });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.headerText}>COIN</Text>
      </View>
      <View style={[styles.rowItem, { height: 120 }]}>
        <Text style={styles.textLabel}>Coin Face</Text>
        <TouchableOpacity
          onPress={toggleModal}
          style={{ flexDirection: "row" }}
        >
          <Image
            source={coinFaceSets[face].heads}
            style={{ resizeMode: "contain", width: 80, height: 80 }}
          />
          <Image
            source={coinFaceSets[face].tails}
            style={{ resizeMode: "contain", width: 80, height: 80 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.sectionHeader,
          {
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          },
        ]}
      >
        <Text style={styles.headerText}>HISTORY</Text>
        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, right: 20, bottom: 5 }}
          onPress={clearHistoryHandler}
        >
          <Text style={[styles.headerText, { color: "red" }]}>CLEAR</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1, backgroundColor: "white" }}
          data={sortByTime("desc", history, "created")}
          keyExtractor={(item, index) => `${item.created}`}
          renderItem={_renderItem}
        />
      </View>
      <View style={styles.sectionHeader} />
      <TouchableOpacity
        onPress={onSaveHandler}
        style={[styles.rowItem, { justifyContent: "center" }]}
      >
        <Text style={styles.save}>Save</Text>
      </TouchableOpacity>
      <View style={{ height: 60 }} />
      <Portal>
        <Modal dismissable={true} visible={visible} onDismiss={toggleModal}>
          <FlatList
            data={coinFaceOptions}
            keyExtractor={(item, index) => item.key}
            renderItem={_renderCoinItem}
          />
        </Modal>
      </Portal>
    </View>
  );
};

export default CoinSettings;
