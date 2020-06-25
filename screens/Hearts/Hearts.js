import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Menu,
  Portal,
  Dialog,
  Divider,
  Paragraph,
  Button,
} from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import { LinearGradient } from "expo-linear-gradient";

// turn % 4
const TURN_RULES_BY_REMAINDER = {
  "1": "Pass Left",
  "2": "Pass Right",
  "3": "Pass Across",
  "0": "Hold 'em",
};

const SCORE_OPTIONS = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  -26,
];

const VALID_SCORES = [26, -26, 78];

const Hearts = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [addedPlayers, setAddedPlayers] = useState([]);
  const [name, setName] = useState("");
  const [p1TurnScore, setP1TurnScore] = useState(0);
  const [p2TurnScore, setP2TurnScore] = useState(0);
  const [p3TurnScore, setP3TurnScore] = useState(0);
  const [p4TurnScore, setP4TurnScore] = useState(0);
  const [p1Open, setP1Open] = useState(false);
  const [p2Open, setP2Open] = useState(false);
  const [p3Open, setP3Open] = useState(false);
  const [p4Open, setP4Open] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winnerDialogOpen, setWinnerDialogOpen] = useState(false);
  const [winner, setWinner] = useState("");
  const { turnNumber, players, score_history = [] } = useSelector(
    (state) => state.hearts
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          {turnNumber > 0 && (
            <Item
              title="Undo"
              onPress={() => dispatch({ type: "HEARTS:UNDO_LAST_SCORE" })}
            />
          )}
          {turnNumber > 0 && (
            <Item title="reset" onPress={requestResetGameHandler} />
          )}
        </HeaderButtons>
      ),
    });
  }, [turnNumber, dispatch, requestResetGameHandler]);

  useEffect(() => {
    if (
      players.p1.score >= 100 ||
      players.p2.score >= 100 ||
      players.p3.score >= 100 ||
      players.p4.score >= 100
    ) {
      const winners = [];
      const lowestScore = Math.min(
        players.p1.score,
        players.p2.score,
        players.p3.score,
        players.p4.score
      );
      if (players.p1.score === lowestScore) {
        winners.push(players.p1.name);
      }
      if (players.p2.score === lowestScore) {
        winners.push(players.p2.name);
      }
      if (players.p3.score === lowestScore) {
        winners.push(players.p3.name);
      }
      if (players.p4.score === lowestScore) {
        winners.push(players.p4.name);
      }
      setGameOver(true);
      setWinnerDialogOpen(true);
      setWinner(winners.join(", "));
    } else {
      setGameOver(false);
    }
  }, [players]);

  const nameChangeHandler = (val) => {
    setName(val);
  };

  const addPlayerHandler = () => {
    if (addedPlayers.length >= 4 || name.trim().length === 0) return;
    const data = [...addedPlayers];
    data.push({ name: name });
    setAddedPlayers(data);
    setName("");
    inputRef.current.focus();
  };

  const removePlayerHandler = (index) => {
    if (addedPlayers.length === 0) return;
    const data = [...addedPlayers];
    data.splice(index, 1);
    setAddedPlayers(data);
  };

  const requestResetGameHandler = () => {
    Alert.alert(
      "Reset Game?",
      "Would you like to reset this game? Any current progress will be lost?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: resetGame },
      ]
    );
  };

  const resetGame = () => {
    dispatch({ type: "HEARTS:RESET" });
    setGameOver(false);
  };

  const startGameHandler = () => {
    if (addedPlayers.length !== 4) return;
    let newGamePlayers = {};
    for (var i = 0; i < addedPlayers.length; i++) {
      newGamePlayers[`p${i + 1}`] = {
        score: 0,
        name: addedPlayers[i].name,
      };
    }
    dispatch({ type: "HEARTS:UPDATE", update: newGamePlayers });
    dispatch({ type: "HEARTS:ADD_TURN" });
  };

  const changeP1ScoreHandler = (val) => {
    setP1TurnScore(val);
    setP1Open(false);
  };

  const changeP2ScoreHandler = (val) => {
    setP2TurnScore(val);
    setP2Open(false);
  };

  const changeP3ScoreHandler = (val) => {
    setP3TurnScore(val);
    setP3Open(false);
  };

  const changeP4ScoreHandler = (val) => {
    setP4TurnScore(val);
    setP4Open(false);
  };

  const addScoreHandler = () => {
    const sumOfScores = p1TurnScore + p2TurnScore + p3TurnScore + p4TurnScore;
    if (!VALID_SCORES.includes(sumOfScores)) {
      return alert(
        `You entered a score of ${sumOfScores} which is not a normal hearts score.`
      );
    }
    const update = {
      p1: p1TurnScore,
      p2: p2TurnScore,
      p3: p3TurnScore,
      p4: p4TurnScore,
      turn: turnNumber,
    };
    dispatch({ type: "HEARTS:ADD_SCORE", turnScore: update });
    setP1TurnScore(0);
    setP2TurnScore(0);
    setP3TurnScore(0);
    setP4TurnScore(0);
  };

  const _renderHistoryItem = ({ item }) => (
    <View style={styles.scoreHistoryItem}>
      <View style={styles.gameSectionCell}>
        <Text style={styles.gameSectionHeaderSubTitle}>{item.p1}</Text>
      </View>
      <View style={styles.gameSectionCell}>
        <Text style={styles.gameSectionHeaderSubTitle}>{item.p2}</Text>
      </View>
      <View style={styles.gameSectionCell}>
        <Text style={styles.gameSectionHeaderSubTitle}>{item.p3}</Text>
      </View>
      <View style={styles.gameSectionCell}>
        <Text style={styles.gameSectionHeaderSubTitle}>{item.p4}</Text>
      </View>
    </View>
  );

  const _renderEmptyScores = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 36,
          fontWeight: "bold",
          margin: 16,
          fontFamily: "open-sans-extra-bold",
        }}
      >
        Good Luck!
      </Text>
      <Text
        style={{
          fontSize: 36,
          fontWeight: "bold",
          margin: 16,
          fontFamily: "open-sans-extra-bold",
        }}
      >
        Have Fun!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {turnNumber === 0 && (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            {addedPlayers.length < 4 && (
              <TextInput
                ref={inputRef}
                style={styles.input}
                value={name}
                placeholder={`Player ${addedPlayers.length + 1} name`}
                onChangeText={nameChangeHandler}
                onSubmitEditing={addPlayerHandler}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={
              addedPlayers.length < 4 ? addPlayerHandler : startGameHandler
            }
          >
            <LinearGradient
              colors={["#FE6B8B", "#FF8E53"]}
              locations={[0.3, 0.9]}
              style={styles.addPlayerButton}
            >
              <Text style={styles.addPlayerButtonText}>
                {addedPlayers.length < 4 ? "Add Player" : "Start Game!"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {addedPlayers.map((player, index) => (
            <View style={styles.playerCard} key={`${index}`}>
              <Text style={styles.playerNameLabel}>{player.name}</Text>
              <TouchableOpacity
                style={styles.playerNameIconButton}
                onPress={() => removePlayerHandler(index)}
              >
                <MaterialCommunityIcons
                  name={"account-remove"}
                  size={30}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      {turnNumber > 0 && (
        <View style={styles.container}>
          <View style={[styles.gameTurnHeader, { backgroundColor: "#FF8E53" }]}>
            <Text style={styles.gameTurnHeaderText}>
              {TURN_RULES_BY_REMAINDER[(turnNumber % 4).toString()]}
            </Text>
            <Text style={styles.gameTurnHeaderText}>Turn: {turnNumber}</Text>
          </View>
          <View style={styles.gameSectionHeader}>
            <View style={styles.gameSectionCell}>
              <Text style={styles.gameSectionHeaderSubTitle}>
                {players.p1.name}
              </Text>
              <Text style={styles.gameSectionHeaderTitle}>
                {players.p1.score}
              </Text>
            </View>
            <View style={styles.gameSectionCell}>
              <Text style={styles.gameSectionHeaderSubTitle}>
                {players.p2.name}
              </Text>
              <Text style={styles.gameSectionHeaderTitle}>
                {players.p2.score}
              </Text>
            </View>
            <View style={styles.gameSectionCell}>
              <Text style={styles.gameSectionHeaderSubTitle}>
                {players.p3.name}
              </Text>
              <Text style={styles.gameSectionHeaderTitle}>
                {players.p3.score}
              </Text>
            </View>
            <View style={styles.gameSectionCell}>
              <Text style={styles.gameSectionHeaderSubTitle}>
                {players.p4.name}
              </Text>
              <Text style={styles.gameSectionHeaderTitle}>
                {players.p4.score}
              </Text>
            </View>
          </View>
          <View style={[styles.gameSectionHeader, { borderTopWidth: 0 }]}>
            <View style={styles.gameSectionCell}>
              <Menu
                visible={p1Open}
                contentStyle={{ paddingVertical: 32 }}
                onDismiss={() => setP1Open(false)}
                anchor={
                  <TouchableOpacity onPress={() => setP1Open(true)}>
                    <LinearGradient
                      colors={["#FE6B8B", "#FF8E53"]}
                      locations={[0.3, 0.9]}
                      style={styles.scorePickerButton}
                    >
                      <Text style={styles.scorePickerText}>{p1TurnScore}</Text>
                      <View style={styles.scorePickerTextUnderline} />
                    </LinearGradient>
                  </TouchableOpacity>
                }
              >
                {SCORE_OPTIONS.map((item) => (
                  <Menu.Item
                    key={`${item}`}
                    title={item}
                    titleStyle={{
                      textAlign: "center",
                      fontFamily: "open-sans",
                    }}
                    onPress={() => changeP1ScoreHandler(item)}
                  />
                ))}
              </Menu>
            </View>
            <View style={styles.gameSectionCell}>
              <Menu
                visible={p2Open}
                contentStyle={{ paddingVertical: 32 }}
                onDismiss={() => setP2Open(false)}
                anchor={
                  <TouchableOpacity onPress={() => setP2Open(true)}>
                    <LinearGradient
                      colors={["#FE6B8B", "#FF8E53"]}
                      locations={[0.3, 0.9]}
                      style={styles.scorePickerButton}
                    >
                      <Text style={styles.scorePickerText}>{p2TurnScore}</Text>
                      <View style={styles.scorePickerTextUnderline} />
                    </LinearGradient>
                  </TouchableOpacity>
                }
              >
                {SCORE_OPTIONS.map((item) => (
                  <Menu.Item
                    key={`${item}`}
                    title={item}
                    titleStyle={{
                      textAlign: "center",
                      fontFamily: "open-sans",
                    }}
                    onPress={() => changeP2ScoreHandler(item)}
                  />
                ))}
              </Menu>
            </View>
            <View style={styles.gameSectionCell}>
              <Menu
                visible={p3Open}
                contentStyle={{ paddingVertical: 32 }}
                onDismiss={() => setP3Open(false)}
                anchor={
                  <TouchableOpacity onPress={() => setP3Open(true)}>
                    <LinearGradient
                      colors={["#FE6B8B", "#FF8E53"]}
                      locations={[0.3, 0.9]}
                      style={styles.scorePickerButton}
                    >
                      <Text style={styles.scorePickerText}>{p3TurnScore}</Text>
                      <View style={styles.scorePickerTextUnderline} />
                    </LinearGradient>
                  </TouchableOpacity>
                }
              >
                {SCORE_OPTIONS.map((item) => (
                  <Menu.Item
                    key={`${item}`}
                    title={item}
                    titleStyle={{
                      textAlign: "center",
                      fontFamily: "open-sans",
                    }}
                    onPress={() => changeP3ScoreHandler(item)}
                  />
                ))}
              </Menu>
            </View>
            <View style={styles.gameSectionCell}>
              <Menu
                visible={p4Open}
                contentStyle={{ paddingVertical: 32 }}
                onDismiss={() => setP4Open(false)}
                anchor={
                  <TouchableOpacity onPress={() => setP4Open(true)}>
                    <LinearGradient
                      colors={["#FE6B8B", "#FF8E53"]}
                      locations={[0.3, 0.9]}
                      style={styles.scorePickerButton}
                    >
                      <Text style={styles.scorePickerText}>{p4TurnScore}</Text>
                      <View style={styles.scorePickerTextUnderline} />
                    </LinearGradient>
                  </TouchableOpacity>
                }
              >
                {SCORE_OPTIONS.map((item) => (
                  <Menu.Item
                    key={`${item}`}
                    title={item}
                    titleStyle={{
                      textAlign: "center",
                      fontFamily: "open-sans",
                    }}
                    onPress={() => changeP4ScoreHandler(item)}
                  />
                ))}
              </Menu>
            </View>
          </View>
          <FlatList
            data={score_history}
            keyExtractor={(item, index) => "key" + index}
            renderItem={_renderHistoryItem}
            style={{ flex: 1 }}
            ItemSeparatorComponent={() => <Divider />}
            ListEmptyComponent={_renderEmptyScores}
          />
          <View style={{ height: 96, width: "100%" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={gameOver ? resetGame : addScoreHandler}
            >
              <LinearGradient
                colors={["#FE6B8B", "#FF8E53"]}
                locations={[0.3, 0.9]}
                style={styles.buttonBackground}
              >
                <Text style={styles.buttonText}>
                  {gameOver ? "Finish" : "Add Score"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <WinnerDialog
        isVisible={winnerDialogOpen}
        onDismiss={() => setWinnerDialogOpen(false)}
        title="Winner!"
        winner={winner}
      />
    </View>
  );
};

export default Hearts;

const WinnerDialog = ({
  isVisible = false,
  onDismiss,
  title = "",
  winner = "",
}) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Divider />
        <Dialog.Content>
          <Paragraph>Congratulations {winner}! You have won!</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
