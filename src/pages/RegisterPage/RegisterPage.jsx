import React from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  return (
    <div className={css.container}>
      <PageTitle>Sign Up</PageTitle>
      <RegistrationForm />
    </div>
  );
}
