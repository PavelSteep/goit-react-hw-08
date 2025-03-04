import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import { createSelector } from '@reduxjs/toolkit';
import { selectAllContacts } from "../contacts/selectors";
import { selectFilter } from "../filters/selectors";

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: "",
    loading: false,
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload; // Сохраняем фильтр в состоянии
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Сохраняем полученные контакты
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Error fetching contacts:", action.payload); // Логируем ошибку
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const selectFilteredContacts = createSelector(
  [selectAllContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);


// export const selectFilteredContacts = createSelector(
//   [(state) => state.contacts.items, (state) => state.filters],
//   (contacts, filter) => {
    
//     if (!filter || typeof filter !== 'string') {
//       return contacts;
//     }

//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   }
// );

export const { setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;






















// import { createSlice, createSelector } from "@reduxjs/toolkit";
// import { fetchContacts, addContact, deleteContact, updateContact } from "./operations";
// import { logOut } from "../auth/operations";


// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState: {
//     user: {
//       name: null,
//       email: null,
//     },
//     token: null,
//     isLoggedIn: false,
//     isRefreshing: false,
//   },
//   // initialState: {
//   //   items: JSON.parse(sessionStorage.getItem("contacts") || "[]"),
//   //   isLoading: false,
//   //   isRefreshing: false,
//   //   error: null,
//   // },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchContacts.pending, state => {
//         state.isLoading = true;
//         state.isRefreshing = true;
//         state.error = null;
//       })
//       .addCase(fetchContacts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isRefreshing = false;
//         state.items = action.payload;
//         sessionStorage.setItem("contacts", JSON.stringify(state.items));
//         state.error = null;
//       })
//       .addCase(fetchContacts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isRefreshing = false;
//         state.error = action.payload;
//         console.error("Ошибка при загрузке контактов:", action.payload);
//       })
//       .addCase(addContact.pending, (state) => {
//         state.isLoading = true;
//         state.isRefreshing = true;
//         state.error = null;
//       })
//       .addCase(addContact.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isRefreshing = false;
//         state.error = null;
//         state.items.push(action.payload);
//         sessionStorage.setItem("contacts", JSON.stringify(state.items));
//       })
//       .addCase(addContact.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isRefreshing = false;
//         state.error = action.payload;
//         console.error("Ошибка при добавлении контакта:", action.payload);
//       })
//       .addCase(deleteContact.pending, state => {
//         state.isLoading = true;
//         state.isRefreshing = true;
//         state.error = null;
//       })
//       .addCase(deleteContact.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isRefreshing = false;
//         state.items = state.items.filter(contact => contact.id !== action.payload);
//         state.error = null;
//         sessionStorage.setItem("contacts", JSON.stringify(state.items));
//     })    
//       // .addCase(deleteContact.fulfilled, (state, action) => {
//       //   state.isLoading = false;
//       //   state.items = state.items.filter((contact) => contact.id !== action.payload);
//       //   const index = state.items.findIndex(
//       //     contact => contact.id === action.payload.id
//       //   );
//       //   state.items.splice(index, 1);
//       //   state.error = null;
//       // })
//       .addCase(deleteContact.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isRefreshing = false;
//         state.error = action.payload;
//         console.error("Ошибка при удалении контакта:", action.payload);
//       })
//       .addCase(updateContact.pending, state => {
//         state.isLoading = true;
//         state.isRefreshing = true;
//         state.error = null;
//       })
//       .addCase(updateContact.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.error = null;
//         const index = state.items.findIndex(contact => contact.id === action.payload.id);
//         if (index !== -1) {
//           state.items[index] = action.payload;
//           sessionStorage.setItem("contacts", JSON.stringify(state.items));
//         }
//       })
//       .addCase(updateContact.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isRefreshing = false;
//         state.error = action.payload;
//         console.error("Ошибка при обновлении контакта:", action.payload);
//       })
//       .addCase(logOut.fulfilled, state => {
//         state.user = {
//           name: null,
//           email: null,
//         }
//         state.token = null;
//         state.isLoggedIn = false;
//       })
//       // .addCase(logOut.fulfilled, state => {
//       //   state.items = [];
//       //   state.isLoading = false;
//       //   state.isRefreshing = false;
//       //   state.error = null;
//       //   sessionStorage.removeItem("contacts");
//       // });
//       // .addCase(logOut, state => {
//       //   state.items = []; // Очищаем контакты при выходе
//       //   state.isLoading = false;
//       //   state.error = null;
//       // });
//   },
// });

// export const selectFilteredContacts = createSelector(
//   [(state) => state.contacts.items, (state) => state.filters],
//   (contacts, filter) => {
//     if (!filter || typeof filter !== 'string') {
//       return contacts;
//     }
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   }
// );

// // export const { setFilter } = contactsSlice.actions;

// export default contactsSlice.reducer;
