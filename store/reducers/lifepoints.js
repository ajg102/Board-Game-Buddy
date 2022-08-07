const initialState = {
  scores: {
    p1: 8000,
    p2: 8000,
  },
  p1Color: "#8ED1FC",
  p2Color: "#EB144C",
  initialScore: "8000",
  logs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIFEPOINTS:UPDATE":
      return {
        ...state,
        scores: { ...state.scores, ...action.update },
      };
    case "LIFEPOINTS:RESET":
      return {
        ...state,
        scores: {
          p1: state.initialScore,
          p2: state.initialScore,
        },
        logs: [],
      };
    case "LIFEPOINTS:LOGS_ADD":
      let data = [...state.logs];
      data.push(action.log);
      return {
        ...state,
        logs: data,
      };
    case "LIFEPOINTS:LOGS_CLEAR":
      return {
        ...state,
        logs: [],
      };
    case "LIFEPOINTS:UPDATE_SETTINGS": {
      return {
        ...state,
        p1Color: action.p1Color,
        p2Color: action.p2Color,
        initialScore: action.initialScore,
      };
    }
    case "LIFEPOINTS:RESET_GAME_STATE":
      const currLogs = [...state.logs];
      const reset_logs = currLogs.filter(
        (item, index) => index < action.logIndex
      );
      return {
        ...state,
        scores: {
          p1: action.p1Score,
          p2: action.p2Score,
        },
        logs: reset_logs,
      };
    default:
      return state;
  }
};

export default reducer;
