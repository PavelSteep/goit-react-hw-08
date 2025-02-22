import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import ContactList from "../../components/ContactList/ContactList";
import ContactEditor from "../../components/ContactEditor/ContactEditor";
import { fetchContacts } from "../../redux/contacts/operations.js";
import { selectLoading } from "../../redux/contacts/selectors.js";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import ContactsForm from "../../components/ContactsForm/ContactsForm.jsx";
import { logOut } from "../../redux/auth/operations"; 
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    console.log("Fetching contacts...");
    dispatch(fetchContacts());

    const handleUnload = () => {
      dispatch(logOut());
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [dispatch]);

  return (
    <div className={css["contacts-container"]}>
      <h1 className={css["page-title"]}>Your contacts</h1>
      <div className={css["contact-editor"]}>
        <ContactsForm />
      </div>
      <div className={css["loading-message"]}>
        {isLoading && "Request in progress..."}
      </div>
      <SearchBox />
      <ContactList />
    </div>
  );
}
