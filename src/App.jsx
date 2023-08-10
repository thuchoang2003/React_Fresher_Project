import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCount } from "./redux/counter/counterSlice";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
const Layout = () => {
  return <>main page</>;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 not found!</div>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>404 not found!</div>,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <div>404 not found!</div>,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
