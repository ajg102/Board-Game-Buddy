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
  Favorites,
  Sketch,
  Hearts,
  Darts,
  //Bracket,
  //BracketList,
  //CreateBracket,
  Spades,
  Counters,
  Settings,
  Chooser,
} from "../screens/index";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../components/NavHeaderButtons";
import CustomDrawer from "../components/Drawer/Drawer";
import { Platform, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

const FavoritesNav = createStackNavigator();
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
const DartsNav = createStackNavigator();
//const BracketNav = createStackNavigator();
const CountersNav = createStackNavigator();
const SpadesNav = createStackNavigator();
const ChooserNav = createStackNavigator();
const DrawerNav = createDrawerNavigator();

const getDefaultScreenOptions = () => {
  return {
    gesturesEnabled: false,
    headerTintColor: Platform.OS === "ios" ? "white" : "white",
    headerStyle: {
      backgroundColor: Platform.OS === "ios" ? "white" : "black",
    },
  };
};

const FavoritesStack = () => (
  <FavoritesNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <FavoritesNav.Screen
      name="stack_0"
      component={Favorites}
      options={screenOptions}
    />
  </FavoritesNav.Navigator>
);

const LifePointsStack = () => (
  <LifePointsNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <LifePointsNav.Screen
      name="stack_1"
      component={LifePoints}
      options={screenOptions}
    />
    <LifePointsNav.Screen
      name="Settings"
      component={Settings}
      options={settingsOptions}
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
    <CoinFlipNav.Screen
      name="Settings"
      component={Settings}
      options={settingsOptions}
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
    <DiceRollNav.Screen
      name="Settings"
      component={Settings}
      options={settingsOptions}
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

const DartsStack = () => (
  <DartsNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <DartsNav.Screen
      name="stack_11"
      component={Darts}
      options={screenOptions}
    />
  </DartsNav.Navigator>
);

const SpadesStack = () => (
  <SpadesNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <SpadesNav.Screen
      name="stack_13"
      component={Spades}
      options={screenOptions}
    />
  </SpadesNav.Navigator>
);

const CountersStack = () => (
  <CountersNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <CountersNav.Screen
      name="stack_14"
      component={Counters}
      options={screenOptions}
    />
  </CountersNav.Navigator>
);

const ChooserStack = () => (
  <ChooserNav.Navigator screenOptions={getDefaultScreenOptions()}>
    <ChooserNav.Screen
      name="stack_15"
      component={Chooser}
      options={chooserScreenOptions}
    />
  </ChooserNav.Navigator>
);

const settingsOptions = ({ navigation, route }) => {
  return {
    headerTitle: "Settings",
    headerTitleStyle: {
      fontFamily: "open-sans-extra-bold",
    },
    headerTitleAlign: "left",
    headerBackground: () => (
      <LinearGradient
        colors={["#FE6B8B", "#FF8E53"]}
        locations={[0.3, 0.9]}
        style={StyleSheet.absoluteFill}
      />
    ),
  };
};

const chooserScreenOptions = ({ navigation, route }) => {
  return {
    headerShown: false,
  };
};

const screenOptions = ({ navigation, route }) => {
  let headerTitle = "";
  switch (route.name) {
    case "stack_0":
      headerTitle = "";
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
    case "stack_11":
      headerTitle = "Darts";
      break;
    // case "stack_12":
    //   headerTitle = "Brackets";
    //   break;
    case "stack_13":
      headerTitle = "Spades";
      break;
    case "stack_14":
      headerTitle = "Counters";
      break;
    case "stack_15":
      headerTitle = "";
      break;
    default:
      headerTitle = "";
  }
  return {
    headerTitle,
    headerTitleAlign: "left",
    headerTitleStyle: {
      fontFamily: "open-sans-extra-bold",
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
        <Item
          iconName="menu"
          title="menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerBackground: () => (
      <LinearGradient
        colors={["#FE6B8B", "#FF8E53"]}
        locations={[0.3, 0.9]}
        style={StyleSheet.absoluteFill}
      />
    ),
  };
};

const Drawer = () => {
  const favorites = useSelector((state) => state.screens.screens);
  const firstFav = favorites.find((item) => item.fav);
  return (
    <DrawerNav.Navigator
      initialRouteName={firstFav ? firstFav.nav : "CoinFlip"}
      edgeWidth={50}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <DrawerNav.Screen name="CoinFlip" component={CoinFlipStack} />
      <DrawerNav.Screen name="Favorites" component={FavoritesStack} />
      <DrawerNav.Screen name="LifePoints" component={LifePointsStack} />
      <DrawerNav.Screen name="Timer" component={TimerStack} />
      <DrawerNav.Screen name="DiceRoll" component={DiceRollStack} />
      <DrawerNav.Screen name="RNG" component={RNGStack} />
      <DrawerNav.Screen name="StopWatch" component={StopWatchStack} />
      <DrawerNav.Screen name="ChessTimer" component={ChessTimerStack} />
      <DrawerNav.Screen name="DnD" component={DnDStack} />
      <DrawerNav.Screen
        name="Sketch"
        component={SketchStack}
        options={() => {
          return {
            gestureEnabled: false,
            swipeEnabled: false,
          };
        }}
      />
      <DrawerNav.Screen name="Hearts" component={HeartsStack} />
      <DrawerNav.Screen name="Darts" component={DartsStack} />
      <DrawerNav.Screen name="Counters" component={CountersStack} />
      {/* <DrawerNav.Screen name="Bracket" component={BracketStack} /> */}
      {/* <DrawerNav.Screen name="Spades" component={SpadesStack} /> */}
      <DrawerNav.Screen name="Chooser" component={ChooserStack} />
    </DrawerNav.Navigator>
  );
};

const AppNav = () => (
  <NavigationContainer>
    <Drawer />
  </NavigationContainer>
);

export default AppNav;
