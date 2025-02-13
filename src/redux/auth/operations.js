import React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://my-app.herokuapp.com";
// axios.defaults.baseURL = "https://goit-task-manager.herokuapp.com/";

const setAuthHeader = token => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
};

const clearAuthHeader = token => {
  axios.defaults.headers.common["Authorization"] = "";
};

/*
* POST @ /users/signup
* body: { name, email, password }
* 
* After successful registration, add the token to the HTTP header
*/
export const register = createAsyncThunk("auth/register", async (newUser, thunkAPI) => {
  try {
    const response = await axios.post("/users/signup", newUser);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
* POST @ /users/login
* body: { email, password }
* 
* After successful login, add the token to the HTTP header
*/
export const logIn = createAsyncThunk("auth/login", async (newInfo, thunkAPI) => {
  try {
    const response = await axios.post("/users/login", newInfo);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
* POST @ /users/logout
* header: Authorization: Bearer token
* 
* After a successful logout, remove the token from the HTTP header
*/
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
