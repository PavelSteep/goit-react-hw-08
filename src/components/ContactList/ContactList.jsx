import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import { fetchContacts } from '../../redux/contacts/operations'; // Если есть операция для получения контактов
import { selectFilteredContacts } from '../../redux/contacts/slice';
import { selectAllContacts } from "../../redux/contacts/selectors.js";
import { selectFilter } from '../../redux/filters/selectors.js';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();

  const visibleContacts = useSelector(selectFilteredContacts) || []; // Селектор для отфильтрованных контактов
  const contacts = useSelector((state) => state.contacts.items); // Здесь предполагаем, что контакты сохраняются в state.contacts.items
  // const contacts = useSelector(selectAllContacts); // Все контакты
  const filter = useSelector((state) => state.filter.filter); // Допустим, фильтр в state.filter.filter
  // const filter = useSelector(selectFilter) || ""; // Значение фильтра

  console.log('visibleContacts:', visibleContacts);
  console.log('contacts:', contacts);
  console.log('filter:', filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    console.log('Contacts:', contacts); // Логируем контакты
    console.log('Filtered Contacts:', visibleContacts); // Логируем отфильтрованные контакты
  }, [contacts, visibleContacts]);

  // Если filter не пустой, фильтруем контакты по имени или номеру
  const filteredContacts = contacts.filter(contact =>
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
