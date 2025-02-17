import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import css from "./PrivateRoute.module.css";

export default function PrivateRoute({ component: Component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const isRefreshing = useSelector(selectIsRefreshing);

  return isLoggedIn ? (
    Component 
  ) : (
    <div className={css.container}>
      <p className={css.message}>Redirecting...</p>
      <Navigate to={redirectTo} />
    </div>
  );
}
