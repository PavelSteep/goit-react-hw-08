import React from "react";
import { useSelector } from "react-redux";
import { selectAllContacts } from "../../redux/contacts/selectors.js";
import css from "./ContactsList.module.css";

export default function ContactsList() {
  const contacts = useSelector(selectAllContacts);

  return (
    <div className={css.contactList}>
      <h2 className={css.title}>Contacts</h2>
      <ul className={css.list}>
        {contacts.map((contact) => (
          <li key={contact.id} className={css.contactItem}>
            <p className={css.contactText}>
              {contact.name} - {contact.phone}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
