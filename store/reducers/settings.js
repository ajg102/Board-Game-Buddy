const initialState = {
  diceRoll: {
    defaultColor: "white",
    history: [],
  },
  coinFlip: {
    coinFace: "og",
    history: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DICE:SET_DEFAULT_COLOR": {
      return {
        ...state,
        diceRoll: {
          ...state.diceRoll,
          defaultColor: action.color,
        },
      };
    }
    case "COIN:SET_COIN_FACE": {
      return {
        ...state,
        coinFlip: {
          ...state.coinFlip,
          coinFace: action.face,
        },
      };
    }
    case "HISTORY:ADD": {
      let data = [...state[action.key].history];
      data.push(action.record);
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          history: data,
        },
      };
    }
    case "HISTORY:CLEAR": {
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          history: [],
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
