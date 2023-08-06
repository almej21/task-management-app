import { createSlice } from "@reduxjs/toolkit";
import * as dateHelpers from "utils/dateHelpers";

var today = dateHelpers.getFormattedDate();
console.log("today:", today);

const initialStateValue = {
  date: today,
};

export const fixturesSlice = createSlice({
  //the name of the slice/state.
  name: "fixtures",

  //the initial state object.
  initialState: {
    value: initialStateValue,
  },

  //the reducers/actions functions.
  reducers: {
    setDate: (state, action) => {
      state.value = action.payload;
      // console.log("state changed: ", state.value);
    },
  },
});

export const { setDate } = fixturesSlice.actions;

export default fixturesSlice.reducer;
