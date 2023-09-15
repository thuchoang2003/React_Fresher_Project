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
import Loading from "./components/Loading/Loading";
import Admin from "./pages/Admin/admin";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import AdminHomepage from "./pages/Admin/admin";
import TableUser from "./pages/Admin/TableUser";
import Dashboard from "./pages/Admin/DashboardAdmin";
import ManagerBook from "./pages/Admin/Book/ManagerBook";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import NotPermitted from "./pages/NotPermitted/NotPermitted";
import ViewDetailBook from "./pages/book/ViewDetailBook";
const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};
const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;
  return (
    <div className="app-container">
      {isAdminRoute && userRole === "ADMIN" && <AdminHomepage />}
      {isAdminRoute && userRole === "USER" && <NotPermitted />}
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
        path: "book/:slug",
        element: <ViewDetailBook />,
      },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "user",
        element: (
          <PerfectScrollbar>
            <TableUser />
          </PerfectScrollbar>
        ),
      },
      {
        path: "book",
        element: <ManagerBook />,
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
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const isLoading = useSelector((state) => state.account.isLoading);
  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;
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
      {(isLoading === false && isAuthenticated === true) ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
