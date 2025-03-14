import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

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
    console.error("Registration error:", error.response?.data || error.message || error);
    return thunkAPI.rejectWithValue(error.response?.data || error.message || error);
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

/*
* GET @ /users/me
* headers: Authorization: Bearer token
*
* Reading the token from the state via getState()
* Add it to the HTTP header and perform the request
* If there is no token, exit without performing any request
*/

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    console.log(reduxState);
    const savedToken = reduxState.auth.token;
    setAuthHeader(savedToken);

    const response = await axios.get("/auth");
    return response.data;
  },
  {
    condition(_, thunkAPI) {       // условия запуска операции, по токину определяет нужно запускать выше операцию
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.token;

      return savedToken !== null;
    },
  }
);
