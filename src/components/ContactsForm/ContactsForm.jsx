import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/operations.js';
import css from './ContactsForm.module.css';

const ContactsForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  
  // Получаем список контактов из состояния
  const contacts = useSelector(state => state.contacts.items);  

  const handleSubmit = event => {
    event.preventDefault();

    // Проверяем, существует ли уже контакт с таким именем
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} already exists`);
      return;
    }

    // dispatch(addContact({ contact: { name, phone } }));

    dispatch(addContact({ name, phone })).then(() => {
      alert('Contact added successfully!');
    }).catch(error => {
      alert("Failed to add contact");
    });

    setName('');
    setPhone('');
  };

  return (
    <form className={css['contact-form']} onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter name"
        required
      />
      <input
        type="tel"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Enter phone number"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactsForm;
