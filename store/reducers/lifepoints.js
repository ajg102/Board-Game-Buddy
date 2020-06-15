const initialState = {
  scores: {
    p1: 8000,
    p2: 8000,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIFEPOINTS:UPDATE":
      return {
        ...state,
        scores: { ...state.scores, ...action.update },
      };
    case "LIFEPOINTS:RESET":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
