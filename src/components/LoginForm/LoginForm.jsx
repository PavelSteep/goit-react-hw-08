import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { logIn } from "../../redux/auth/operations";
import { register } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
    .unwrap()
    .then(data => {
      toast.success("Success!!!");
    })
    .catch(error => {
      console.log(error);
    });
    actions.resetForm();
  };

  // const handleSubmit = (values, actions) => {
  //   dispatch(register(values))
  //     .unwrap()
  //     .then((data) => {
  //       toast.success("Registration successful!");
  //     })
  //     .catch((error) => {
  //       toast.error(error.message || "Registration failed");
  //     });
  //   actions.resetForm();
  // };

  // const handleLogin = (values, actions) => {
  //   dispatch(logIn(values))
  //     .unwrap()
  //     .then((data) => {
  //       toast.success("Login successful!");
  //     })
  //     .catch((error) => {
  //       toast.error(error.message || "Login failed");
  //     });
  //   actions.resetForm();
  // };

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
