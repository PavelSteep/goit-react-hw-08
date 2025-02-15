import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

export const { setFilter } = slice.actions;
export default slice.reducer;
