import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screens: [
    { label: "Life Points", nav: "LifePoints", fav: false },
    { label: "Coin Flip", nav: "CoinFlip", fav: false },
    { label: "Dice Roll", nav: "DiceRoll", fav: false },
    { label: "Random Number", nav: "RNG", fav: false },
    { label: "Stop Watch", nav: "StopWatch", fav: false },
    { label: "Chess Timer", nav: "ChessTimer", fav: false },
    { label: "DnD Dice Roller", nav: "DnD", fav: false },
    { label: "Timer", nav: "Timer", fav: false },
    // { label: "Sketch Canvas", nav: "Sketch", fav: false },
    { label: "Hearts", nav: "Hearts", fav: false },
    { label: "Darts", nav: "Darts", fav: false },
  ],
};

const screensSlice = createSlice({
  name: "screens",
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      const screens = [...state.screens];
      const index = screens.findIndex((item) => item.nav === action.payload);
      const updatedScreen = { ...screens[index], fav: true };
      screens.splice(index, 1);
      screens.push(updatedScreen);
      return {
        ...state,
        screens: screens,
      };
    },
    remove: (state, action) => {
      const screens = [...state.screens];
      const index = screens.findIndex((item) => item.nav === action.payload);
      const updatedScreen = { ...screens[index], fav: false };
      screens.splice(index, 1);
      screens.push(updatedScreen);
      return {
        ...state,
        screens: screens,
      };
    },
    reset: () => initialState,
  },
});

export const { add, remove, reset } = screensSlice.actions;

export default screensSlice.reducer;
