import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./modules/home/HomePage";
const Login = lazy(() => import("./modules/auth/pages/Login"));
const Register = lazy(() => import("./modules/auth/pages/Register"));
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
    path: "/home",
    element: <HomePage />,
  },
]);

export default browserRouter;
