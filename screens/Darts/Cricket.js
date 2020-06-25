import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { Menu, Divider } from "react-native-paper";
import { styles } from "./styles";
import dartImage from "../../assets/dart.png";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Line } from "react-native-svg";
import { ActionCreators } from "redux-undo";

const Cricket = (props) => {
  const dispatch = useDispatch();
  const [turnPlayer, setTurnPlayer] = useState(1);
  const [dartsThrown, setDartsThrown] = useState(0);
  const [team1Name, setTeam1Name] = useState("Team 1");
  const [team2Name, setTeam2Name] = useState("Team 2");
  const [editTeam, setEditTeam] = useState(null);
  const [nameChangeOpen, setNameChangeOpen] = useState(false);
  const [startTurnVisible, setStartTurnVisible] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [winner, setWinner] = useState("");
  const cricketState = useSelector((state) => state.darts.present.cricket);
  const cricketHistory = useSelector((state) => state.darts.past);
  const canUndo = cricketHistory.length > 0 && dartsThrown !== 0;
  useEffect(() => {
    const winner_1 = checkHasGameEnded(
      cricketState.team1,
      cricketState.team2.score
    );
    const winner_2 = checkHasGameEnded(
      cricketState.team2,
      cricketState.team1.score
    );
    if (winner_1) {
      setGameFinished(true);
      setWinner(team1Name);
    } else if (winner_2) {
      setGameFinished(true);
      setWinner(team2Name);
    }
  }, [cricketState]);

  const checkHasGameEnded = (teamScore, otherScore) => {
    const {
      _20 = 0,
      _19 = 0,
      _18 = 0,
      _17 = 0,
      _16 = 0,
      _15 = 0,
      _bull = 0,
      score = 0,
    } = teamScore;
    if (
      _20 === 3 &&
      _19 === 3 &&
      _18 === 3 &&
      _17 === 3 &&
      _16 === 3 &&
      _15 === 3 &&
      _bull === 3
    ) {
      if (score >= otherScore) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const throwDartHandler = (type, num) => {
    if (dartsThrown > 2) return;
    switch (type) {
      case 20:
        dispatch({
          type: "DARTS:CRICKET:THROW",
          player: turnPlayer,
          num: num,
          val: "_20",
        });
        break;
      case 19:
        dispatch({
          type: "DARTS:CRICKET:THROW",
          player: turnPlayer,
          num: num,
          val: "_19",
        });
        break;
      case 18:
        dispatch({
          type: "DARTS:CRICKET:THROW",
          player: turnPlayer,
          num: num,
          val: "_18",
        });
        break;
      case 17:
        dispatch({
          type: "DARTS:CRICKET:THROW",
          player: turnPlayer,
          num: num,
          val: "_17",
        });
        break;
      case 16:
        dispatch({
          type: "DARTS:CRICKET:THROW",
          player: turnPlayer,
          num: num,
          val: "_16",
        });
        break;
      case 15:
        dispatch({
          type: "DARTS:CRICKET:THROW",
          player: turnPlayer,
          num: num,
          val: "_15",
        });
        break;
      case "bull":
        dispatch({
          type: "DARTS:CRICKET:THROW",
          player: turnPlayer,
          num: num,
          val: "_bull",
        });
        break;
    }
    setDartsThrown((prev) => {
      if (prev === 2 && !gameFinished) {
        setStartTurnVisible(true);
      }
      return prev + 1;
    });
  };

  const undoLastThrowHandler = () => {
    if (dartsThrown === 0) return;
    if (canUndo) {
      dispatch(ActionCreators.undo());
      setDartsThrown((prev) => prev - 1);
      setGameFinished(false);
      setStartTurnVisible(false);
    }
  };

  const changeTurnHandler = () => {
    if (turnPlayer === 1) {
      setTurnPlayer(2);
    } else {
      setTurnPlayer(1);
    }
    setStartTurnVisible(false);
    setDartsThrown(0);
  };

  const missThrowHandler = () => {
    if (dartsThrown > 2) return;
    dispatch({ type: "DARTS:CRICKET:MISS", player: turnPlayer });
    setDartsThrown((prev) => {
      if (prev === 2 && !gameFinished) {
        setStartTurnVisible(true);
      }
      return prev + 1;
    });
  };

  const onResetRequestHandler = () => {
    Alert.alert("Reset", "Would you like to reset this game?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: resetGameHandler },
    ]);
  };

  const resetGameHandler = () => {
    setTurnPlayer(1);
    setDartsThrown(0);
    dispatch({ type: "DARTS:RESET" });
    setGameFinished(false);
    setStartTurnVisible(false);
    setTeam1Name("Team 1");
    setTeam2Name("Team 2");
  };

  const toggleNameChangeOverlay = (team) => {
    setNameChangeOpen(true);
    setEditTeam(team);
  };

  const changeNameHandler = (name) => {
    if (name.trim().length === 0) return;
    if (editTeam === 1) {
      setTeam1Name(name);
    } else {
      setTeam2Name(name);
    }
    setNameChangeOpen(false);
    setEditTeam(null);
  };

  const nameToEdit = {
    1: team1Name,
    2: team2Name,
  };
  return (
    <View style={styles.container}>
      <StartTurnOverlay
        visible={startTurnVisible && !gameFinished}
        player={turnPlayer === 1 ? team2Name : team1Name}
        onPress={changeTurnHandler}
        undo={undoLastThrowHandler}
      />
      <GameEndedOverlay
        onPress={resetGameHandler}
        visible={gameFinished}
        winner={winner}
        undo={undoLastThrowHandler}
        team1={{ ...cricketState.team1, name: team1Name }}
        team2={{ ...cricketState.team2, name: team2Name }}
      />
      <NameChangeOverlay
        visible={nameChangeOpen}
        value={nameToEdit[editTeam]}
        onDismiss={() => setNameChangeOpen(false)}
        onDone={changeNameHandler}
      />
      <View style={{ width: "100%", flexDirection: "row", height: 125 }}>
        <TouchableOpacity
          onPress={() => toggleNameChangeOverlay(1)}
          style={styles.teamHeader}
        >
          <Text style={styles.cricketHeaderText}>{team1Name}</Text>
          {turnPlayer === 1 && (
            <View style={styles.dartImageContainer}>
              <Image
                style={[
                  styles.dartImage,
                  dartsThrown > 2 && { tintColor: "#aaa" },
                ]}
                source={dartImage}
              />
              <Image
                style={[
                  styles.dartImage,
                  dartsThrown > 1 && { tintColor: "#aaa" },
                ]}
                source={dartImage}
              />
              <Image
                style={[
                  styles.dartImage,
                  dartsThrown > 0 && { tintColor: "#aaa" },
                ]}
                source={dartImage}
              />
            </View>
          )}
          <Text style={styles.cricketHeaderText}>
            {cricketState.team1.score}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleNameChangeOverlay(2)}
          style={styles.teamHeader}
        >
          <Text style={styles.cricketHeaderText}>{team2Name}</Text>
          {turnPlayer === 2 && (
            <View style={styles.dartImageContainer}>
              <Image
                style={[
                  styles.dartImage,
                  dartsThrown > 2 && { tintColor: "#aaa" },
                ]}
                source={dartImage}
              />
              <Image
                style={[
                  styles.dartImage,
                  dartsThrown > 1 && { tintColor: "#aaa" },
                ]}
                source={dartImage}
              />
              <Image
                style={[
                  styles.dartImage,
                  dartsThrown > 0 && { tintColor: "#aaa" },
                ]}
                source={dartImage}
              />
            </View>
          )}
          <Text style={styles.cricketHeaderText}>
            {cricketState.team2.score}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={[styles.cricketScoreRowItem, { backgroundColor: "#fff" }]}>
          <ScoreItem value={cricketState.team1._20} />
          <View style={styles.cricketScoreButton}>
            <ScoreButton
              type={20}
              onPress={(num) => throwDartHandler(20, num)}
            />
          </View>
          <ScoreItem value={cricketState.team2._20} />
        </View>
        <View style={[styles.cricketScoreRowItem, { backgroundColor: "#fff" }]}>
          <ScoreItem value={cricketState.team1._19} />
          <View style={styles.cricketScoreButton}>
            <ScoreButton
              type={19}
              onPress={(num) => throwDartHandler(19, num)}
            />
          </View>
          <ScoreItem value={cricketState.team2._19} />
        </View>
        <View style={[styles.cricketScoreRowItem, { backgroundColor: "#fff" }]}>
          <ScoreItem value={cricketState.team1._18} />
          <View style={styles.cricketScoreButton}>
            <ScoreButton
              type={18}
              onPress={(num) => throwDartHandler(18, num)}
            />
          </View>
          <ScoreItem value={cricketState.team2._18} />
        </View>
        <View style={[styles.cricketScoreRowItem, { backgroundColor: "#fff" }]}>
          <ScoreItem value={cricketState.team1._17} />
          <View style={styles.cricketScoreButton}>
            <ScoreButton
              type={17}
              onPress={(num) => throwDartHandler(17, num)}
            />
          </View>
          <ScoreItem value={cricketState.team2._17} />
        </View>
        <View style={[styles.cricketScoreRowItem, { backgroundColor: "#fff" }]}>
          <ScoreItem value={cricketState.team1._16} />
          <View style={styles.cricketScoreButton}>
            <ScoreButton
              type={16}
              onPress={(num) => throwDartHandler(16, num)}
            />
          </View>
          <ScoreItem value={cricketState.team2._16} />
        </View>
        <View style={[styles.cricketScoreRowItem, { backgroundColor: "#fff" }]}>
          <ScoreItem value={cricketState.team1._15} />
          <View style={styles.cricketScoreButton}>
            <ScoreButton
              type={15}
              onPress={(num) => throwDartHandler(15, num)}
            />
          </View>
          <ScoreItem value={cricketState.team2._15} />
        </View>
        <View style={[styles.cricketScoreRowItem, { backgroundColor: "#fff" }]}>
          <ScoreItem value={cricketState.team1._bull} />
          <View style={styles.cricketScoreButton}>
            <ScoreButton
              type={"bull"}
              onPress={(num) => throwDartHandler("bull", num)}
            />
          </View>
          <ScoreItem value={cricketState.team2._bull} />
        </View>
        <View
          style={[
            styles.cricketScoreRowItem,
            {
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <TouchableOpacity
            onPress={missThrowHandler}
            style={styles.cricketMissButton}
          >
            <LinearGradient
              colors={["#FE6B8B", "#FF8E53"]}
              locations={[0.3, 0.9]}
              style={styles.cricketMissButtonBackground}
            >
              <Text style={styles.cricketMissButtonText}>Miss</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.cricketScoreRowItem,
            {
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <TouchableOpacity
            onPress={undoLastThrowHandler}
            style={styles.cricketMissButton}
            disabled={dartsThrown === 0}
          >
            <LinearGradient
              colors={["#FE6B8B", "#FF8E53"]}
              locations={[0.3, 0.9]}
              style={styles.cricketMissButtonBackground}
            >
              <Text style={styles.cricketMissButtonText}>Undo Last Throw</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.cricketScoreRowItem,
            {
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <TouchableOpacity
            onPress={onResetRequestHandler}
            style={styles.cricketMissButton}
          >
            <LinearGradient
              colors={["#FE6B8B", "#FF8E53"]}
              locations={[0.3, 0.9]}
              style={styles.cricketMissButtonBackground}
            >
              <Text style={styles.cricketMissButtonText}>Reset Game</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

export default Cricket;

const ScoreItem = ({ value = 0 }) => {
  return (
    <View
      style={{ width: "30%", justifyContent: "center", alignItems: "center" }}
    >
      {value === 1 && (
        <Svg height="36" width="36">
          <Line x1="0" y1="0" x2="36" y2="36" stroke="black" strokeWidth="2" />
        </Svg>
      )}
      {value === 2 && (
        <MaterialCommunityIcons name="close" size={36} color="black" />
      )}
      {value === 3 && (
        <MaterialCommunityIcons
          name="close-circle-outline"
          size={36}
          color="black"
        />
      )}
    </View>
  );
};

const ScoreButton = ({ onPress = () => {}, type = 20, disabled = false }) => {
  const [open, setOpen] = useState(false);
  const onPressHandler = (type) => {
    onPress(type);
    setOpen(false);
  };
  if (type === "bull") {
    return (
      <Menu
        visible={open}
        onDismiss={() => setOpen(false)}
        anchor={
          <TouchableOpacity
            disabled={disabled}
            style={{ alignSelf: "center" }}
            onPress={() => setOpen(true)}
          >
            <LinearGradient
              colors={["#FE6B8B", "#FF8E53"]}
              locations={[0.3, 0.9]}
              style={styles.scorePickerButton}
            >
              <MaterialCommunityIcons name="bullseye" size={38} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        }
      >
        <Menu.Item title="Single" onPress={() => onPressHandler(1)} />
        <Menu.Item title="Double" onPress={() => onPressHandler(2)} />
      </Menu>
    );
  }
  return (
    <Menu
      visible={open}
      onDismiss={() => setOpen(false)}
      anchor={
        <TouchableOpacity
          disabled={disabled}
          style={{ alignSelf: "center" }}
          onPress={() => setOpen(true)}
        >
          <LinearGradient
            colors={["#FE6B8B", "#FF8E53"]}
            locations={[0.3, 0.9]}
            style={styles.scorePickerButton}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              {type}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      }
    >
      <Menu.Item title="Single" onPress={() => onPressHandler(1)} />
      <Menu.Item title="Double" onPress={() => onPressHandler(2)} />
      <Menu.Item title="Triple" onPress={() => onPressHandler(3)} />
    </Menu>
  );
};

const StartTurnOverlay = ({
  visible = false,
  player = 1,
  onPress = () => {},
  undo = () => {},
}) => {
  if (!visible) {
    return null;
  }
  //const name = player === 1 ? "Team 2" : "Team 1";
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, .8)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: "90%",
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FE6B8B",
          margin: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Start {player}'s turn
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={undo}
        style={{
          width: "90%",
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FE6B8B",
          margin: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Undo Last Throw
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const GameEndedOverlay = ({
  visible = false,
  winner = "",
  onPress = () => {},
  undo = () => {},
  team1 = {},
  team2 = {},
}) => {
  if (!visible) {
    return null;
  }
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, .8)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          margin: 16,
          borderWidth: 2,
          borderColor: "#FE6B8B",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
            margin: 16,
          }}
        >
          {winner} has won!
        </Text>
        <View
          style={{
            width: "90%",
            height: 0,
            borderWidth: 2,
            borderColor: "#aaa",
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                margin: 16,
              }}
            >
              {team1.name}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                margin: 4,
              }}
            >
              Accuracy
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                margin: 4,
              }}
            >
              {Math.ceil(
                ((team1.num_throw - team1.num_miss) / team1.num_throw) * 100
              )}
              %
            </Text>
          </View>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                margin: 16,
              }}
            >
              {team2.name}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                margin: 4,
              }}
            >
              Accuracy
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                margin: 4,
              }}
            >
              {Math.ceil(
                ((team2.num_throw - team2.num_miss) / team2.num_throw) * 100
              )}
              %
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: "90%",
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FE6B8B",
          margin: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Done
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={undo}
        style={{
          width: "90%",
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FE6B8B",
          margin: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Undo Last Throw
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const NameChangeOverlay = ({
  value = "",
  onDismiss = () => {},
  onDone = () => {},
  visible = false,
}) => {
  const [val, setVal] = useState("");
  useEffect(() => {
    setVal(value);
  }, [value]);
  if (!visible) return null;
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, .8)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginVertical: 16,
          width: "90%",
          height: 56,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#FE6B8B",
          alignSelf: "center",
          backgroundColor: "rgba(174, 174, 174, 1)",
        }}
      >
        <TextInput
          style={{
            width: "100%",
            height: "100%",
            padding: 12,
            fontSize: 20,
            color: "white",
          }}
          value={val}
          placeholder={"Change team name"}
          onChangeText={(text) => setVal(text)}
          onSubmitEditing={() => onDone(val)}
        />
      </View>
      <TouchableOpacity
        onPress={() => onDone(val)}
        style={{
          width: "90%",
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FE6B8B",
          margin: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Done
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onDismiss}
        style={{
          width: "90%",
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FE6B8B",
          margin: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
};
