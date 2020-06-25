import undoable, { includeAction } from "redux-undo";

const initialState = {
  cricket: {
    team1: {
      _20: 0,
      _19: 0,
      _18: 0,
      _17: 0,
      _16: 0,
      _15: 0,
      _bull: 0,
      score: 0,
      num_miss: 0,
      num_throw: 0,
    },
    team2: {
      _20: 0,
      _19: 0,
      _18: 0,
      _17: 0,
      _16: 0,
      _15: 0,
      _bull: 0,
      score: 0,
      num_miss: 0,
      num_throw: 0,
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DARTS:RESET":
      return initialState;
    case "DARTS:CRICKET:MISS":
      if (action.player === 1) {
        return {
          ...state,
          cricket: {
            ...state.cricket,
            team1: {
              ...state.cricket.team1,
              num_miss: state.cricket.team1.num_miss + 1,
              num_throw: state.cricket.team1.num_throw + 1,
            },
          },
        };
      } else {
        return {
          ...state,
          cricket: {
            ...state.cricket,
            team2: {
              ...state.cricket.team2,
              num_miss: state.cricket.team2.num_miss + 1,
              num_throw: state.cricket.team2.num_throw + 1,
            },
          },
        };
      }

    case "DARTS:CRICKET:THROW":
      let score = 0;
      let total = 0;
      if (action.player === 1) {
        total = state.cricket.team1[action.val] + action.num;
        if (state.cricket.team2[action.val] < 3 && total > 3) {
          score = (total - 3) * POINT_VALUES[action.val];
        }
        return {
          ...state,
          cricket: {
            ...state.cricket,
            team1: {
              ...state.cricket.team1,
              [action.val]: total > 3 ? 3 : total,
              score: state.cricket.team1.score + score,
              num_throw: state.cricket.team1.num_throw + 1,
            },
          },
        };
      } else {
        total = state.cricket.team2[action.val] + action.num;
        if (state.cricket.team1[action.val] < 3 && total > 3) {
          score = (total - 3) * POINT_VALUES[action.val];
        }
        return {
          ...state,
          cricket: {
            ...state.cricket,
            team2: {
              ...state.cricket.team2,
              [action.val]: total > 3 ? 3 : total,
              score: state.cricket.team2.score + score,
              num_throw: state.cricket.team2.num_throw + 1,
            },
          },
        };
      }

    default:
      return state;
  }
};

//export default reducer;

const undoableReducer = undoable(reducer, {
  filter: includeAction(["DARTS:CRICKET:THROW", "DARTS:CRICKET:MISS"]),
});

export default undoableReducer;

const POINT_VALUES = {
  _20: 20,
  _19: 19,
  _18: 18,
  _17: 17,
  _16: 16,
  _15: 15,
  _bull: 25,
};
