import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  LifePoints,
  Timer,
  CoinFlip,
  DiceRoll,
  RNG,
  StopWatch,
  ChessTimer,
  ChessClock,
  DnD,
  Settings,
  Sketch,
  Hearts,
} from "../screens/index";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../components/NavHeaderButtons";
import CustomDrawer from "../components/Drawer/Drawer";
import { Platform } from "react-native";

const SettingsNav = createStackNavigator();
const LifePointsNav = createStackNavigator();
const TimerNav = createStackNavigator();
const CoinFlipNav = createStackNavigator();
const DiceRollNav = createStackNavigator();
const RNGNav = createStackNavigator();
const StopWatchNav = createStackNavigator();
const ChessTimerNav = createStackNavigator();
const DnDNav = createStackNavigator();
const SketchNav = createStackNavigator();
const HeartsNav = createStackNavigator();
const DrawerNav = createDrawerNavigator();

const getDefaultScreenOptions = () => {
  return {
    gesturesEnabled: false,
    headerTintColor: Platform.OS === "ios" ? "black" : "white",
    headerStyle: {
      backgroundColor: Platform.OS === "ios" ? "white" : "black",
    },
  };
};

const SettingsStack = () => (
  <SettingsNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <SettingsNav.Screen
      name="stack_0"
      component={Settings}
      options={screenOptions}
    />
  </SettingsNav.Navigator>
);

const LifePointsStack = () => (
  <LifePointsNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <LifePointsNav.Screen
      name="stack_1"
      component={LifePoints}
      options={screenOptions}
    />
  </LifePointsNav.Navigator>
);
const TimerStack = () => (
  <TimerNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <TimerNav.Screen name="stack_2" component={Timer} options={screenOptions} />
  </TimerNav.Navigator>
);
const CoinFlipStack = () => (
  <CoinFlipNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <CoinFlipNav.Screen
      name="stack_3"
      component={CoinFlip}
      options={screenOptions}
    />
  </CoinFlipNav.Navigator>
);
const DiceRollStack = () => (
  <DiceRollNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <DiceRollNav.Screen
      name="stack_4"
      component={DiceRoll}
      options={screenOptions}
    />
  </DiceRollNav.Navigator>
);
const RNGStack = () => (
  <RNGNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <RNGNav.Screen name="stack_5" component={RNG} options={screenOptions} />
  </RNGNav.Navigator>
);

const StopWatchStack = () => (
  <StopWatchNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <StopWatchNav.Screen
      name="stack_6"
      component={StopWatch}
      options={screenOptions}
    />
  </StopWatchNav.Navigator>
);

const ChessTimerStack = () => (
  <ChessTimerNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <ChessTimerNav.Screen
      name="stack_7"
      component={ChessTimer}
      options={screenOptions}
    />
    <ChessTimerNav.Screen
      name="ChessClock"
      component={ChessClock}
      options={{ headerShown: false }}
    />
  </ChessTimerNav.Navigator>
);

const DnDStack = () => (
  <DnDNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <DnDNav.Screen name="stack_8" component={DnD} options={screenOptions} />
  </DnDNav.Navigator>
);

const SketchStack = () => (
  <SketchNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <SketchNav.Screen
      name="stack_9"
      component={Sketch}
      options={screenOptions}
    />
  </SketchNav.Navigator>
);

const HeartsStack = () => (
  <HeartsNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <HeartsNav.Screen
      name="stack_10"
      component={Hearts}
      options={screenOptions}
    />
  </HeartsNav.Navigator>
);

const screenOptions = ({ navigation, route }) => {
  let headerTitle = "";
  switch (route.name) {
    case "stack_0":
      headerTitle = "Settings";
      break;
    case "stack_1":
      headerTitle = "Life Points";
      break;
    case "stack_2":
      headerTitle = "Timer";
      break;
    case "stack_3":
      headerTitle = "Coin Flip";
      break;
    case "stack_4":
      headerTitle = "Dice Roll";
      break;
    case "stack_5":
      headerTitle = "R.N.G.";
      break;
    case "stack_6":
      headerTitle = "Stop Watch";
      break;
    case "stack_7":
      headerTitle = "Chess Timer";
      break;
    case "stack_8":
      headerTitle = "DnD Dice Roller";
      break;
    case "stack_9":
      headerTitle = "Sketch Canvas";
      break;
    case "stack_10":
      headerTitle = "Hearts";
      break;
    default:
      headerTitle = "";
  }
  return {
    headerTitle,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
        <Item
          iconName="menu"
          title="menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

const Drawer = () => (
  <DrawerNav.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
    <DrawerNav.Screen name="CoinFlip" component={CoinFlipStack} />
    <DrawerNav.Screen name="Settings" component={SettingsStack} />
    <DrawerNav.Screen name="LifePoints" component={LifePointsStack} />
    <DrawerNav.Screen name="Timer" component={TimerStack} />
    <DrawerNav.Screen name="DiceRoll" component={DiceRollStack} />
    <DrawerNav.Screen name="RNG" component={RNGStack} />
    <DrawerNav.Screen name="StopWatch" component={StopWatchStack} />
    <DrawerNav.Screen name="ChessTimer" component={ChessTimerStack} />
    <DrawerNav.Screen name="DnD" component={DnDStack} />
    <DrawerNav.Screen name="Sketch" component={SketchStack} />
    <DrawerNav.Screen name="Hearts" component={HeartsStack} />
  </DrawerNav.Navigator>
);

const AppNav = () => (
  <NavigationContainer>
    <Drawer />
  </NavigationContainer>
);

export default AppNav;
