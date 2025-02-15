import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import css from "./ContactEditor.module.css";

export default function ContactEditor() {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name is too short")
      .max(50, "Name is too long")
      .required("Required field"),
    phone: Yup.string()
      .matches(/^\+?\d{10,15}$/, "Enter a valid number")
      .required("Required field"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact({ name: values.name, number: values.phone }));
    resetForm();
  };

  return (
    <Formik 
      initialValues={initialValues} 
      validationSchema={validationSchema} 
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <h2 className={css.title}>Add Contact</h2>

          <label className={css.label}>
            Name
            <Field type="text" name="name" className={css.input} />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Phone
            <Field type="tel" name="phone" className={css.input} />
            <ErrorMessage name="phone" component="div" className={css.error} />
          </label>

          <button type="submit" className={css.button} disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Contact"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
