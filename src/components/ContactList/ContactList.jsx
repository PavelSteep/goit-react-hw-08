import React from 'react';
import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/contacts/slice';


const ContactList = () => {
  
  const visibleContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css['contact-list']}>
      {visibleContacts.length > 0 ? (
        visibleContacts.map(({ id, name, phone }) =>
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
