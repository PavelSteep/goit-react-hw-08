import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { register } from "./operations";
import { logIn } from "./operations";
import { logOut } from "./operations";
import { addContacts } from "../contacts/operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    contacts: [],
  },
  extraReducers: builder => 
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    }).addCase(logIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    }).addCase(logOut.fulfilled, state => {
      state.user = {
        name: null,
        email: null,
      };
      state.token = null;
      state.isLoggedIn = false;
    })
    .addCase(addContacts.fulfilled, (state, action) => {
      state.contacts.push(action.payload);
    }),
});

export default authSlice.reducer;
