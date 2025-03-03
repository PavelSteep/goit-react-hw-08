import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import css from './Contact.module.css';


const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={css['contact-item']}>
      <span className={css['contact-name']}>{name}</span>
      <span className={css['contact-phone']}>{number}</span>
      <button className={css['delete-button']} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
