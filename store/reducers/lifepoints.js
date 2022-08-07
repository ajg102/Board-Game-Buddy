import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scores: {
    p1: 8000,
    p2: 8000,
  },
};

const lifepointsSlice = createSlice({
  name: "lifepoints",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return {
        ...state,
        scores: { ...state.scores, ...action.payload.update },
      };
    },
    reset: () => initialState,
  },
});

export const { update, reset } = lifepointsSlice.actions;

export default lifepointsSlice.reducer;
