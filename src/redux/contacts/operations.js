import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Устанавливаем базовый URL для всех запросов
axios.defaults.baseURL = "https://connections-api.goit.global/";

// Получение списка всех контактов (GET /contacts)
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      // Отправляем запрос на /contacts
      const response = await axios.get("/contacts");
      console.log("Fetched contacts:", response.data); // Логируем полученные данные
      if (response.data.length === 0) {
        console.warn("Нет контактов на сервере!");
      }
      return response.data;
    } catch (error) {
      console.error("Fetch contacts error:", error); // Логируем ошибку
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Добавление нового контакта (POST /contacts)
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({name, number}, thunkAPI) => {
    try {
      // Отправляем запрос на /contacts для создания нового контакта
      const response = await axios.post("/contacts", {name, number});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Удаление контакта (DELETE /contacts/{contactId})
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      // Отправляем запрос на /contacts/{id} для удаления контакта
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Обновление контакта (PUT /contacts/{contactId})
export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, name, number }, thunkAPI) => {
    try {
      // Отправляем запрос на /contacts/{id} для обновления контакта
      const response = await axios.put(`/contacts/${id}`, { name, number });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
