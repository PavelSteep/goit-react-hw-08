import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    console.log("Values being sent:", values);

    dispatch(register(values))
      .unwrap()
      .then(() => {
        navigate("/login"); // Перенаправляем пользователя на страницу логина
      })
      .catch((error) => {
        console.error("Registration error:", error.response?.data || error.message || error);
        console.error("Registration error:", error);

        console.error("Error response:", error.response);
        console.error("Error message:", error.message);
        console.error("Error details:", error);
      });

    actions.resetForm();
  };


    // actions.dispatch(register(values));

    // actions.resetForm();


  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Username
          <Field type="text" name="name" />
        </label>
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
        </label>
        <label className={css.label}>
          Password
          <Field type="password" name="password" />
        </label>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
