import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import WeatherMQTT from "./modules/clock/clockUI";
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
    element: <div>Home Page</div>,
  },
  {
    path: "/weather",
    element: <WeatherMQTT />,
  },
]);

export default browserRouter;
