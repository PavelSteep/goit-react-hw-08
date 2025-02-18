export const selectIsRefreshing = (state) => state.contacts.isRefreshing;

export const selectLoading = (state) => state.contacts.isLoading;

export const selectFilter = (state) => state.contacts.filter;

export const selectAllContacts = (state) => state.contacts.items;

export const selectContacts = (state) => state.contacts.items;

export const selectError = (state) => state.contacts.error;
