import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import css from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={css["login-container"]}>
      <h1 className={css["page-title"]}>Please log in</h1>
      <LoginForm />
    </div>
  );
}
