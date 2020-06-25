import React, { useState, useEffect } from "react";
import { Portal, Dialog, Button, Divider } from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown";

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
  useEffect(() => {
    const providedTime = formatTime(time);
    setHours(providedTime.hours);
    setMins(providedTime.mins);
    setSecs(providedTime.secs);
  }, [time]);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title style={{ color: "#FF8E53" }}>{title}</Dialog.Title>
        <Divider />
        <Dialog.Content>
          <Dropdown
            value={hrs}
            itemCount={9}
            pickerStyle={{
              width: 80,
              alignItems: "center",
              justifyContent: "center",
            }}
            label="Hours"
            data={data.hours}
            onChangeText={(val) => setHours(val)}
          />
          <Dropdown
            value={mins}
            itemCount={9}
            pickerStyle={{
              width: 80,
              alignItems: "center",
              justifyContent: "center",
            }}
            label="Minutes"
            data={data.minutes}
            onChangeText={(val) => setMins(val)}
          />
          <Dropdown
            value={secs}
            itemCount={9}
            pickerStyle={{
              width: 80,
              alignItems: "center",
              justifyContent: "center",
            }}
            label="Seconds"
            data={data.seconds}
            onChangeText={(val) => setSecs(val)}
          />
        </Dialog.Content>
        <Divider />
        <Dialog.Actions>
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
