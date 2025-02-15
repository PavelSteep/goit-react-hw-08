import React from "react";
import { NavLink } from "react-router-dom";
import { selectUser } from "../../redux/auth/selectors";
import css from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <nav className={css.authNav}>
      <NavLink to="/register" className={css.link}>
        Sign Up
      </NavLink>
      <NavLink to="/login" className={css.link}>
        Log In
      </NavLink>
    </nav>
  );
}
