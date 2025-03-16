import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

// Устанавливает заголовок Authorization с токеном
const setAuthHeader = token => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Очищает заголовок Authorization
const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 * 
 * После успешной регистрации добавляет токен в заголовок HTTP
 */
export const register = createAsyncThunk("auth/register", async (newUser, thunkAPI) => {
  try {
    const response = await axios.post("/users/signup", newUser);
    setAuthHeader(response.data.token); // Здесь добавляется токен в заголовок
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

/*
 * POST @ /users/login
 * body: { email, password }
 * 
 * После успешного входа добавляет токен в заголовок HTTP
 */
export const logIn = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post("/users/login", credentials);
    setAuthHeader(response.data.token); // Здесь добавляется токен в заголовок
    return response.data;
  } catch (error) {
    // Исправлено: Ошибка при обработке запроса, если ошибка пришла из ответа сервера
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 * 
 * После успешного выхода удаляет токен из заголовка HTTP
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout"); // Отправляем запрос на выход
    clearAuthHeader(); // Очищаем заголовок авторизации
  } catch (error) {
    // Исправлено: Ошибка при обработке запроса на выход
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 *
 * Читает токен из состояния через getState(),
 * добавляет его в заголовок HTTP и выполняет запрос.
 * Если токена нет, завершает выполнение без запроса.
 */
export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState(); // Получаем состояние из thunkAPI
  const savedToken = state.auth.token; // Извлекаем сохраненный токен

  // Исправлено: добавлено условие для проверки наличия токена
  if (!savedToken) return thunkAPI.rejectWithValue("No token found");

  setAuthHeader(savedToken); // Устанавливаем токен в заголовок

  try {
    const response = await axios.get("/users/current"); // Выполняем запрос на получение данных пользователя
    return response.data;
  } catch (error) {
    // Исправлено: Ошибка при обработке запроса на обновление данных пользователя
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});
