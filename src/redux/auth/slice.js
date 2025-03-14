import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operations";
import { selectAuthItems } from "./selectors";
import { selectFilter } from "../filters/selectors";
import { addContact } from "../contacts/operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    items: [],
    filter: "",
    loading: false,
    error: null,
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder => 
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    })
    .addCase(logIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    })
    .addCase(logOut.fulfilled, state => {
      state.user = {
        name: null,
        email: null,
      }
      state.token = null;
      state.isLoggedIn = false;
    })
    .addCase(refreshUser.pending, (state) => {
      state.isRefreshing = true;
    })
    .addCase(refreshUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    })
    .addCase(refreshUser.rejected, (state) => {
      state.isRefreshing = false;
    })
});

// export const selectFilteredAuth = createSelector(
//   [selectAuthItems, selectFilter],
//   (auth, filterValue) => {
//     if (!filterValue) {
//       return auth;
//     }
//     return auth.filter((contact) =>
//       contact.name.toLowerCase().includes(filterValue.toLowerCase())
//     );
//   }
// );

export default authSlice.reducer;
