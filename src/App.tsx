import React from "react";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Service from "./pages/Service";
import Topup from "./pages/Topup";
import Transaction from "./pages/Transaction";
import Account from "./pages/Account";
import { RootState } from "./app/store";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
  Navigate,
} from "react-router-dom";
import { selectUser } from "./app/userSlice";

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const user = useSelector(selectUser);
  return user ? element : <Navigate to="/login" />;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute element={<Home />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/service",
    element: <ProtectedRoute element={<Service />} />,
  },
  {
    path: "/topup",
    element: <ProtectedRoute element={<Topup />} />,
  },
  {
    path: "/transactions",
    element: <ProtectedRoute element={<Transaction />} />,
  },
  {
    path: "/account",
    element: <ProtectedRoute element={<Account />} />,
  },
  {
    path: "*", // catch-all for unsupported paths
    element: <Navigate to="/" replace />,
  },
];

const router = createBrowserRouter(routes);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
