import { createSlice, current } from "@reduxjs/toolkit";
import * as dateHelpers from "utils/dateHelpers";

var today = dateHelpers.getFormattedDate();
console.log("today:", today);

const initialStateValue = {
  date: today,
  country_leagues: ["England", "Spain", "Italy", "France", "Germany"],
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
      state.value.date = action.payload;
    },

    enableLeague: (state, action) => {
      state.value.country_leagues.push(action.payload.target_league);
    },

    disableLeague: (state, action) => {
      state.value.country_leagues = state.value.country_leagues.filter(
        (league) => league !== action.payload.target_league
      );
    },
  },
});

export const { setDate, enableLeague, disableLeague } = fixturesSlice.actions;

export default fixturesSlice.reducer;
