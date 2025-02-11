import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import ContactsList from "../../components/ContactsList/ContactsList";
import ContactEditor from "../../components/ContactEditor/ContactEditor";
import { fetchContacts } from "../../redux/contacts/operations.js";
import { selectLoading } from "../../redux/contacts/selectors.js";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css["contacts-container"]}>
      <h1 className={css["page-title"]}>Your contacts</h1>
      <div className={css["contact-editor"]}>
        <ContactEditor />
      </div>
      <div className={css["loading-message"]}>
        {isLoading && "Request in progress..."}
      </div>
      <ContactsList />
    </div>
  );
}
