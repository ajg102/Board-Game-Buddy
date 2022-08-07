import React, { useState, useEffect } from "react";
import { Portal, Dialog, Button, Divider, Menu } from "react-native-paper";
import { TouchableWithoutFeedback, Text, StyleSheet, View } from "react-native";

const formatNumber = (number) => `0${number}`.slice(-2);

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const mins = Math.floor((time - hours * 3600) / 60);
  const secs = time - mins * 60 - hours * 3600;
  return {
    hours: formatNumber(hours),
    mins: formatNumber(mins),
    secs: formatNumber(secs),
  };
};

const TimePicker = ({
  visible = false,
  onCancel,
  onDone,
  title = "Test",
  time = 0,
}) => {
  const [hrs, setHours] = useState("00");
  const [mins, setMins] = useState("00");
  const [secs, setSecs] = useState("00");
  const [hrsOpen, setHrsOpen] = useState(false);
  const [minsOpen, setMinsOpen] = useState(false);
  const [secsOpen, setSecsOpen] = useState(false);
  useEffect(() => {
    const providedTime = formatTime(time);
    setHours(providedTime.hours);
    setMins(providedTime.mins);
    setSecs(providedTime.secs);
  }, [time]);

  const onClear = () => {
    setHours("00");
    setMins("00");
    setSecs("00");
  };

  const hoursChangeHandler = (val) => {
    setHours(val);
    setHrsOpen(false);
  };

  const minsChangeHandler = (val) => {
    setMins(val);
    setMinsOpen(false);
  };

  const secsChangeHandler = (val) => {
    setSecs(val);
    setSecsOpen(false);
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title style={{ color: "#FF8E53" }}>{title}</Dialog.Title>
        <Divider />
        <Dialog.Content>
          <Menu
            visible={hrsOpen}
            onDismiss={() => setHrsOpen(false)}
            anchor={
              <TouchableWithoutFeedback onPress={() => setHrsOpen(true)}>
                <View style={styles.timeItem}>
                  <Text style={styles.text}>{hrs}</Text>
                  <Text style={styles.label}>Hours</Text>
                </View>
              </TouchableWithoutFeedback>
            }
            contentStyle={{ paddingVertical: 32 }}
          >
            {helpers.hoursList.map((item) => (
              <Menu.Item
                title={item}
                onPress={() => hoursChangeHandler(item)}
                key={item}
                titleStyle={{ textAlign: "center" }}
              />
            ))}
          </Menu>
          <Menu
            visible={minsOpen}
            onDismiss={() => setMinsOpen(false)}
            anchor={
              <TouchableWithoutFeedback onPress={() => setMinsOpen(true)}>
                <View style={styles.timeItem}>
                  <Text style={styles.text}>{mins}</Text>
                  <Text style={styles.label}>Minutes</Text>
                </View>
              </TouchableWithoutFeedback>
            }
            contentStyle={{ paddingVertical: 32 }}
          >
            {helpers.minutesList.map((item) => (
              <Menu.Item
                title={item}
                onPress={() => minsChangeHandler(item)}
                key={item}
                titleStyle={{ textAlign: "center" }}
              />
            ))}
          </Menu>
          <Menu
            visible={secsOpen}
            onDismiss={() => setSecsOpen(false)}
            anchor={
              <TouchableWithoutFeedback onPress={() => setSecsOpen(true)}>
                <View style={styles.timeItem}>
                  <Text style={styles.text}>{secs}</Text>
                  <Text style={styles.label}>Seconds</Text>
                </View>
              </TouchableWithoutFeedback>
            }
            contentStyle={{ paddingVertical: 32 }}
          >
            {helpers.secondsList.map((item) => (
              <Menu.Item
                title={item}
                onPress={() => secsChangeHandler(item)}
                key={item}
                titleStyle={{ textAlign: "center" }}
              />
            ))}
          </Menu>
        </Dialog.Content>
        <Divider />
        <Dialog.Actions>
          <Button color="#FF8E53" onPress={onClear}>
            Clear
          </Button>
          <Button color="#FF8E53" onPress={onCancel}>
            Cancel
          </Button>
          <Button color="#FF8E53" onPress={() => onDone(hrs, mins, secs)}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  timeItem: {
    alignSelf: "center",
    margin: 8,
    borderBottomWidth: 1,
    height: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    fontFamily: "open-sans",
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 20,
    fontFamily: "open-sans",
    paddingHorizontal: 4,
    opacity: 0.6,
    color: "#aaa",
  },
});

const helpers = {
  hoursList: [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ],
  minutesList: [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ],
  secondsList: [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ],
};

const data = {
  hours: helpers.hoursList.map((item) => {
    return {
      label: item,
      value: item,
    };
  }),
  minutes: helpers.minutesList.map((item) => {
    return {
      label: item,
      value: item,
    };
  }),
  seconds: helpers.secondsList.map((item) => {
    return {
      label: item,
      value: item,
    };
  }),
};
