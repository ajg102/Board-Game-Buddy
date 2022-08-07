import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialTime: 300,
  whiteInitialTime: 300,
  blackInitialTime: 300,
  modifier: 0,
};

export const chessTimerSlice = createSlice({
  name: "chessTimer",
  initialState: initialState,
  reducers: {
    setInitialTime: (state, action) => ({
      ...state,
      initialTime: action.payload.time,
    }),
    setWhiteTime: (state, action) => ({
      ...state,
      whiteInitialTime: action.payload.time,
    }),
    setBlackTime: (state, action) => ({
      ...state,
      blackInitialTime: action.payload.time,
    }),
    setModifier: (state, action) => ({
      ...state,
      modifier: action.payload.modifier,
    }),
    resetChess: () => initialState,
  },
});

export const {
  resetChess,
  setBlackTime,
  setInitialTime,
  setModifier,
  setWhiteTime,
} = chessTimerSlice.actions;

export default chessTimerSlice.reducer;
