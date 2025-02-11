import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContacts } from "../../redux/contacts/operations";
import css from "./ContactEditor.module.css";

export default function ContactEditor() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone) {
      dispatch(addContacts({ name, phone }));
      setName("");
      setPhone("");
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Add Contact</h2>
      <label className={css.label}>
        Name
        <input
          type="text"
          className={css.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className={css.label}>
        Phone
        <input
          type="tel"
          className={css.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <button type="submit" className={css.button}>Add Contact</button>
    </form>
  );
}
