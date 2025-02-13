import React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET @ /contacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts')
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST @ /contact
export const addContacts = createAsyncThunk(
  'contacts/addContact',
  // async (text, thunkAPI) => {
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, number });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// DELETE @ /contact/:id
export const deleteContacts = createAsyncThunk(
  'contacts/deleteContacts',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// PATCH @ /contacts/:id
export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, name, number }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${contactId}`, { name, number });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
