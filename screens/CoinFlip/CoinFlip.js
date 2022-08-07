import React, { useState, useRef, useEffect } from "react";
import { View, Button, ScrollView, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import Coin from "./Coin";

const CoinFlip = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const face = useSelector((state) => state.settings.coinFlip.coinFace);
  const [isFlipping, setIsFlipping] = useState(false);
  const [numCoins, setNumCoins] = useState([React.createRef()]);
  const [numHeads, setNumHeads] = useState(0);
  const [numTails, setNumTails] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item iconName="plus" title="add" onPress={addCoin} />
          <Item iconName="minus" title="subtract" onPress={subtractCoin} />
          <Item
            iconName="settings"
            title="settings"
            onPress={openCoinSettings}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, numCoins]);

  useEffect(() => {
    getCoinValuesHandler();
  }, [numCoins]);

  const addCoin = () => {
    if (numCoins.length === 12) return;
    setNumCoins((prev) => [...prev, React.createRef()]);
  };

  const subtractCoin = () => {
    if (numCoins.length === 1) return;
    const data = [...numCoins];
    data.splice(0, 1);
    setNumCoins(data);
  };

  const openCoinSettings = () => {
    navigation.navigate("Settings", { lastScreen: "Coin" });
  };

  const flipAll = () => {
    const flips = numCoins.map((ref) => {
      return ref.current.flipCoinAsync();
    });
    Promise.all(flips)
      .then(() => {
        const { heads, tails } = getCoinValuesHandler();
        setIsFlipping(false);
        dispatch({
          type: "HISTORY:ADD",
          key: "coinFlip",
          record: {
            created: Date.now(),
            results: `Heads: ${heads} Tails: ${tails}`,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCoinValuesHandler = () => {
    const heads = [];
    const tails = [];
    for (var i = 0; i < numCoins.length; i++) {
      if (numCoins[i].current.state.value === 0) {
        heads.push(1);
      } else if (numCoins[i].current.state.value === 1) {
        tails.push(1);
      }
    }
    setNumHeads(heads.length);
    setNumTails(tails.length);
    return { heads: heads.length, tails: tails.length };
  };

  const onFlipFinishedHandler = () => {
    setIsFlipping(false);
    getCoinValuesHandler();
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>Heads: </Text>
        <Text style={styles.resultsText}>{!isFlipping ? numHeads : ""}</Text>
        <Text style={styles.resultsText}>Tails: </Text>
        <Text style={styles.resultsText}>{!isFlipping ? numTails : ""}</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.coins}>
        {numCoins.map((ref, index) => (
          <Coin
            key={index + ""}
            ref={ref}
            face={face}
            onStartFlip={() => setIsFlipping(true)}
            onFlipFinished={onFlipFinishedHandler}
            numCoins={numCoins.length}
          />
        ))}
      </ScrollView>
      <View style={{ height: 96, width: "100%" }}>
        {!isFlipping && (
          <TouchableOpacity onPress={flipAll} style={styles.button}>
            <LinearGradient
              colors={["#FE6B8B", "#FF8E53"]}
              locations={[0.3, 0.9]}
              style={styles.buttonBackground}
            >
              <Text style={styles.buttonText}>FLIP ALL</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CoinFlip;
