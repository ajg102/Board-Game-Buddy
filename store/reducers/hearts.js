const initialState = {
  turnNumber: 0,
  players: {
    p1: {
      score: 0,
      name: "",
    },
    p2: {
      score: 0,
      name: "",
    },
    p3: {
      score: 0,
      name: "",
    },
    p4: {
      score: 0,
      name: "",
    },
  },
  score_history: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEARTS:UPDATE":
      return {
        ...state,
        players: { ...state.players, ...action.update },
      };
    case "HEARTS:ADD_TURN":
      return {
        ...state,
        turnNumber: state.turnNumber + 1,
      };
    case "HEARTS:UNDO_TURN":
      return {
        ...state,
        turnNumber: state.turnNumber - 1,
      };
    case "HEARTS:ADD_SCORE":
      return {
        ...state,
        turnNumber: state.turnNumber + 1,
        players: {
          ...state.players,
          p1: {
            ...state.players.p1,
            score: state.players.p1.score + action.turnScore.p1,
          },
          p2: {
            ...state.players.p2,
            score: state.players.p2.score + action.turnScore.p2,
          },
          p3: {
            ...state.players.p3,
            score: state.players.p3.score + action.turnScore.p3,
          },
          p4: {
            ...state.players.p4,
            score: state.players.p4.score + action.turnScore.p4,
          },
        },
        score_history: [...state.score_history, action.turnScore],
      };
    case "HEARTS:UNDO_LAST_SCORE":
      if (state.turnNumber === 0) {
        return {
          ...state,
        };
      }
      const removedLastScore = [...state.score_history];
      const index = removedLastScore.findIndex(
        (item) => item.turn === state.turnNumber - 1
      );
      const scoreObjectToSubtract = { ...removedLastScore[index] };
      removedLastScore.splice(index, 1);
      return {
        ...state,
        turnNumber: state.turnNumber - 1,
        score_history: removedLastScore,
        players: {
          ...state.players,
          p1: {
            ...state.players.p1,
            score: state.players.p1.score - scoreObjectToSubtract.p1,
          },
          p2: {
            ...state.players.p2,
            score: state.players.p2.score - scoreObjectToSubtract.p2,
          },
          p3: {
            ...state.players.p3,
            score: state.players.p3.score - scoreObjectToSubtract.p3,
          },
          p4: {
            ...state.players.p4,
            score: state.players.p4.score - scoreObjectToSubtract.p4,
          },
        },
      };
    case "HEARTS:RESET":
      return {
        ...state,
        turnNumber: 0,
        players: {
          p1: {
            ...state.players.p1,
            score: 0,
          },
          p2: {
            ...state.players.p2,
            score: 0,
          },
          p3: {
            ...state.players.p3,
            score: 0,
          },
          p4: {
            ...state.players.p4,
            score: 0,
          },
        },
        score_history: [],
      };
    case "HEARTS:CLEAR":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
