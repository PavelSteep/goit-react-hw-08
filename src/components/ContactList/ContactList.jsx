import React from 'react';
import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import { selectFilteredContacts } from '../../redux/contacts/slice';
import { selectAllContacts } from "../../redux/contacts/selectors.js";
import { selectFilter } from '../../redux/filters/selectors.js';
import css from './ContactList.module.css';

const ContactList = () => {
  const visibleContacts = useSelector(selectFilteredContacts) || [];
  const contacts = useSelector(selectAllContacts);
  const filter = useSelector(selectFilter) || "";

  console.log('visibleContacts:', visibleContacts);
  console.log('contacts:', contacts);
  console.log('filter:', filter);

  // Проверяем, что filter — это строка, а visibleContacts — массив объектов
  const filteredContacts = visibleContacts.filter(contact =>
    (contact?.name?.toLowerCase()?.includes(filter.toLowerCase()) || contact?.number?.includes(filter))
  );

  console.log('filteredContacts:', filteredContacts);

  return (
    <ul className={css['contact-list']}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map(({ id, name, number }) =>
          id && name && number ? (
            <Contact key={id} id={id} name={name} number={number} />
          ) : null
        )
      ) : (
        <li>No contacts to display</li>
      )}
    </ul>
  );
};

export default ContactList;
