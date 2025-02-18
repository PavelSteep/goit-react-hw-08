import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import Layout from "../components/Layout/Layout";
import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";
import { fetchContacts } from "../redux/contacts/operations";
import { selectLoading } from "../redux/contacts/selectors";
import RestrictedRoute from "../components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import "modern-normalize";
import './App.module.css';

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isContactsLoading = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchContacts());
  }, [dispatch]);
  
  return (
    <>
      {(isRefreshing || isContactsLoading) ? (
          <ClipLoader color="#36d7b7" size={50} />
        ) : (
      <Layout>
        <Suspense
          fallback={
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <ClipLoader color="#36d7b7" size={50} />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RestrictedRoute component={<RegisterPage />} redirectTo="/" />} />
            <Route path="/login" element={<RestrictedRoute component={<LoginPage />} redirectTo="/contacts" />} />
            <Route path="/contacts" element={<PrivateRoute component={<ContactsPage />} redirectTo="/login" />} />
          </Routes>
        </Suspense>
      </Layout>
          )}
    </>
  );
}

export default App;
