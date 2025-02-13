export const selectLoading = (state) => state.contacts.loading;

export const selectFilter = (state) => state.contacts.filter;

export const selectAllContacts = (state) => state.contacts.items;

export const selectError = (state) => state.contacts.error;
