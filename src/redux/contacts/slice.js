import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, updateContact } from "./operations";
import { logOut } from "../auth/operations";


const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: JSON.parse(sessionStorage.getItem("contacts") || "[]"),
    isLoading: false,
    isRefreshing: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.items = action.payload;
        sessionStorage.setItem("contacts", JSON.stringify(state.items));
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = action.payload;
        console.error("Ошибка при загрузке контактов:", action.payload);
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = null;
        state.items.push(action.payload);
        sessionStorage.setItem("contacts", JSON.stringify(state.items));
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = action.payload;
        console.error("Ошибка при добавлении контакта:", action.payload);
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.items = state.items.filter(contact => contact.id !== action.payload);
        state.error = null;
        sessionStorage.setItem("contacts", JSON.stringify(state.items));
    })    
      // .addCase(deleteContact.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.items = state.items.filter((contact) => contact.id !== action.payload);
      //   const index = state.items.findIndex(
      //     contact => contact.id === action.payload.id
      //   );
      //   state.items.splice(index, 1);
      //   state.error = null;
      // })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = action.payload;
        console.error("Ошибка при удалении контакта:", action.payload);
      })
      .addCase(updateContact.pending, state => {
        state.isLoading = true;
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(contact => contact.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
          sessionStorage.setItem("contacts", JSON.stringify(state.items));
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = action.payload;
        console.error("Ошибка при обновлении контакта:", action.payload);
      })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = null;
        sessionStorage.removeItem("contacts");
      });
      // .addCase(logOut, state => {
      //   state.items = []; // Очищаем контакты при выходе
      //   state.isLoading = false;
      //   state.error = null;
      // });
  },
});

export const selectFilteredContacts = createSelector(
  [(state) => state.contacts.items, (state) => state.filters],
  (contacts, filter) => {
    if (!filter || typeof filter !== 'string') {
      return contacts;
    }
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

// export const { setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
