import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logIn } from "../../redux/auth/operations";
import { register } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("Success!!!");
        navigate("/contacts"); // Перенаправляем на страницу контактов
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid login or password");
      });

    actions.resetForm();
  };

  return (
    <Formik 
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoCapitalize="off">
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
        </label>
        <label className={css.label}>
          Password
          <Field type="password" name="password" />
        </label>
        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
}
