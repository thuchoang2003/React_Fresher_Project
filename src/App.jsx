import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCount } from "./redux/counter/counterSlice";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact/Contact";
import Book from "./pages/book/book";
import Homepage from "./components/Homepage/Homepage";
import NotFound from "./pages/NotFound/NotFound";
import "./assets/scss/Main.scss";
import { fetchAccount } from "./apiService/apiServices";
import { doGetAccount } from "./redux/counter/accountSlice";
const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "contacts",
        element: <Contact />,
      },
      {
        path: "book",
        element: <Book />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NotFound />,
  },
]);

export default function App() {
  const dispatch = useDispatch();
  const getAccount = async () => {
    let res = await fetchAccount();
    if (res && res.data) {
      dispatch(doGetAccount(res.data));
    }
  };
  useEffect(() => {
    getAccount();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
