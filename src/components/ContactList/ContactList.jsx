import React from 'react';
import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import { selectFilteredContacts } from '../../redux/contacts/slice';
import { selectFilter } from '../../redux/filters/selectors.js';
import css from './ContactList.module.css';

const ContactList = () => {
  const visibleContacts = useSelector(selectFilteredContacts) || [];
  const filter = useSelector(selectFilter) || "";

  // Проверяем, что filter — это строка, а visibleContacts — массив объектов
  const filteredContacts = visibleContacts.filter(contact =>
    (contact?.name?.toLowerCase()?.includes(filter.toLowerCase()) || contact?.phone?.includes(filter))
  );

  return (
    <ul className={css['contact-list']}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map(({ id, name, phone }) =>
          id && name && phone ? (
            <Contact key={id} id={id} name={name} phone={phone} />
          ) : null
        )
      ) : (
        <li>No contacts to display</li>
      )}
    </ul>
  );
};

export default ContactList;
