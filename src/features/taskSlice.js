import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  id: 0,
  title: "",
  description: "",
  status: "",
};

export const taskReducer = createSlice({
  //the name of the slice/state.
  name: "task",

  //the initial state object.
  initialState: {
    value: initialStateValue,
  },

  //the reducers/actions functions.
  reducers: {
    edittask: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { edittask } = taskReducer.actions;

export default taskReducer.reducer;
