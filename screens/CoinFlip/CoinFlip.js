import React, { useState, useRef, useEffect } from "react";
import { View, Button, ScrollView, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import Coin from "./Coin";

const CoinFlip = (props) => {
  const { navigation } = props;
  const [isFlipping, setIsFlipping] = useState(false);
  const [numCoins, setNumCoins] = useState([React.createRef()]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item iconName="plus" title="add" onPress={addCoin} />
          <Item iconName="minus" title="subtract" onPress={subtractCoin} />
        </HeaderButtons>
      ),
    });
  }, [navigation, numCoins]);

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

  const flipAll = () => {
    numCoins.forEach((ref) => {
      ref.current.flipCoin();
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.coins}>
        {numCoins.map((ref, index) => (
          <Coin
            key={index + ""}
            ref={ref}
            onStartFlip={() => setIsFlipping(true)}
            onFlipFinished={() => setIsFlipping(false)}
            numCoins={numCoins.length}
          />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={flipAll} style={styles.button}>
        <Text style={styles.buttonText}>FLIP ALL</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CoinFlip;
