export const selectLoading = (state) => state.contacts.isLoading;

export const selectFilter = (state) => state.contacts.filter;

export const selectAllContacts = (state) => state.contacts.items;

export const selectContacts = (state) => state.auth.contacts;

export const selectError = (state) => state.contacts.error;
