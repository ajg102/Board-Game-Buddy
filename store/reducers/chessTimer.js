const initialState = {
  initialTime: 300,
  whiteInitialTime: 300,
  blackInitialTime: 300,
  modifier: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INITIAL_TIME":
      return {
        ...state,
        initialTime: action.time,
      };
    case "SET_WHITE_TIME":
      return {
        ...state,
        whiteInitialTime: action.time,
      };
    case "SET_BLACK_TIME":
      return {
        ...state,
        blackInitialTime: action.time,
      };
    case "SET_MODIFIER":
      return {
        ...state,
        modifier: action.time,
      };
    case "RESET:CHESS":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
