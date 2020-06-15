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
    { label: "Sketch Canvas", nav: "Sketch", fav: false },
    { label: "Hearts", nav: "Hearts", fav: false },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FAVORITES:ADD": {
      let screens = [...state.screens];
      let index = screens.findIndex((item) => item.nav === action.key);
      let updatedScreen = { ...screens[index], fav: true };
      screens.splice(index, 1);
      screens.push(updatedScreen);
      return {
        ...state,
        screens: screens,
      };
    }
    case "FAVORITES:REMOVE": {
      let screens = [...state.screens];
      let index = screens.findIndex((item) => item.nav === action.key);
      let updatedScreen = { ...screens[index], fav: false };
      screens.splice(index, 1);
      screens.push(updatedScreen);
      return {
        ...state,
        screens: screens,
      };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
