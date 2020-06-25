import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { HelperText, Menu, Switch } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { HeaderBackButton } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CreateBracket = ({ navigation, route }) => {
  const playerNameInputRef = useRef();
  const [step, setStep] = useState(1);
  const [bracketName, setBracketName] = useState("");
  const [description, setDescription] = useState("");
  const [numPlayers, setNumPlayers] = useState("");
  const [type, setType] = useState("");
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [assignSeeds, setAssignSeeds] = useState(false);
  const [addedPlayers, setAddedPlayers] = useState([]);
  const [participantName, setParticipantName] = useState("");
  const [participantSeed, setParticipantSeed] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton {...props} onPress={stepBackHandler} />
      ),
    });
  }, [navigation, step]);

  const _renderItem = ({ item, index }) => (
    <View style={styles.playerCard}>
      {item.seed && <Text style={styles.playerNameLabel}>{item.seed}</Text>}
      <Text style={styles.playerNameLabel}>{item.name}</Text>
      <TouchableOpacity
        style={styles.playerNameIconButton}
        onPress={() => removePlayerHandler(index)}
      >
        <MaterialCommunityIcons name={"account-remove"} size={30} color="red" />
      </TouchableOpacity>
    </View>
  );

  const typeChangeHandler = (val) => {
    switch (val) {
      case 1:
        setType("Single-Elimination");
        setTypeMenuOpen(false);
        break;
      case 2:
        setType("Double-Elimination");
        setTypeMenuOpen(false);
        break;
    }
  };

  const bracketDetailsHandler = () => {
    stepForwardHandler();
  };

  const bracketPlayersHandler = () => {
    if (numPlayers < addedPlayers.length) {
      return alert(
        "You have too many participants added. Remove some before proceeding."
      );
    } else if (numPlayers > addedPlayers.length) {
      return alert("You have not added all the participants needed.");
    } else {
      stepForwardHandler();
    }
  };

  const stepForwardHandler = () => {
    //if (step === max) return
    setStep((prev) => prev + 1);
  };

  const stepBackHandler = () => {
    if (step === 1) {
      return navigation.pop();
    }
    setStep((prev) => prev - 1);
  };

  const addPlayerHandler = () => {
    if (
      addedPlayers.length >= numPlayers ||
      participantName.trim().length === 0
    )
      return;
    const data = [...addedPlayers];
    data.push({ name: participantName, seed: null });
    setAddedPlayers(data);
    setParticipantName("");
    playerNameInputRef.current.focus();
  };

  const removePlayerHandler = (index) => {
    if (addedPlayers.length === 0) return;
    const data = [...addedPlayers];
    data.splice(index, 1);
    setAddedPlayers(data);
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>Bracket Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={bracketName}
                placeholder="Bracket Name"
                onChangeText={(val) => setBracketName(val)}
              />
            </View>
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>Description (optional)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={description}
                placeholder="Description"
                onChangeText={(val) => setDescription(val)}
              />
            </View>
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>Number of Teams/Players</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={numPlayers}
                placeholder="Number of Participants"
                keyboardType="number-pad"
                onChangeText={(val) => setNumPlayers(val)}
              />
              <HelperText
                type="error"
                visible={isNaN(numPlayers) || parseInt(numPlayers) <= 0}
              >
                Please enter a number larger than 0
              </HelperText>
            </View>
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>Bracket Type</Text>
            <TouchableOpacity
              onPress={() => setTypeMenuOpen(true)}
              style={styles.inputContainer}
            >
              <Menu
                visible={typeMenuOpen}
                onDismiss={() => setTypeMenuOpen(false)}
                anchor={
                  <TextInput
                    pointerEvents="none"
                    style={styles.input}
                    value={type}
                    placeholder="Select a type..."
                    editable={false}
                  />
                }
              >
                <Menu.Item
                  title="Single-Elimination"
                  onPress={() => typeChangeHandler(1)}
                />
                <Menu.Item
                  title="Double-Elimination"
                  onPress={() => typeChangeHandler(2)}
                />
              </Menu>
            </TouchableOpacity>
          </View>
          <View style={[styles.inputItem, styles.rowStyles]}>
            <Text style={styles.inputLabel}>Manually Assign Seeds?</Text>
            <Switch
              color="#FE6B8B"
              value={assignSeeds}
              onValueChange={(val) => setAssignSeeds(val)}
            />
          </View>
          <TouchableOpacity
            disabled={
              isNaN(numPlayers) ||
              bracketName.trim().length === 0 ||
              type === ""
            }
            onPress={bracketDetailsHandler}
            style={styles.button}
          >
            <LinearGradient
              colors={["#FE6B8B", "#FF8E53"]}
              locations={[0.3, 0.9]}
              style={[
                styles.buttonBackground,
                {
                  opacity:
                    isNaN(numPlayers) ||
                    bracketName.trim().length === 0 ||
                    type === ""
                      ? 0.2
                      : 1,
                },
              ]}
            >
              <Text style={styles.buttonText}>NEXT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      )}
      {step === 2 && (
        <>
          <View style={[styles.inputItem, styles.rowStyles]}>
            <Text style={[styles.inputLabel, { fontWeight: "bold" }]}>
              Participants
            </Text>
            <Text
              style={[
                styles.inputLabel,
                {
                  fontWeight: "bold",
                  color: numPlayers < addedPlayers.length ? "red" : "black",
                },
              ]}
            >
              {addedPlayers.length}/{numPlayers}
            </Text>
          </View>
          <View style={[styles.inputContainer, { marginVertical: 16 }]}>
            {addedPlayers.length < numPlayers && (
              <TextInput
                ref={playerNameInputRef}
                style={styles.input}
                value={participantName}
                placeholder={`Participant ${addedPlayers.length + 1}'s name`}
                onChangeText={(val) => setParticipantName(val)}
                onSubmitEditing={addPlayerHandler}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={
              addedPlayers.length < numPlayers
                ? addPlayerHandler
                : bracketPlayersHandler
            }
          >
            <LinearGradient
              colors={["#FE6B8B", "#FF8E53"]}
              locations={[0.3, 0.9]}
              style={styles.addPlayerButton}
            >
              <Text style={styles.addPlayerButtonText}>
                {addedPlayers.length < numPlayers ? "Add Player" : "Next"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <FlatList
            data={addedPlayers}
            keyExtractor={(item, index) => `${index}`}
            renderItem={_renderItem}
          />
        </>
      )}
    </View>
  );
};

export default CreateBracket;
