import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Navigation.module.css";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={({ isActive }) => (isActive ? css.active : css.link)}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={({ isActive }) => (isActive ? css.active : css.link)}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
