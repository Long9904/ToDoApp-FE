import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MQTTSettings from "./modules/mqtt/MqttPage";
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
    path: "/mqtt",
    element: <MQTTSettings />,
  },
]);

export default browserRouter;
