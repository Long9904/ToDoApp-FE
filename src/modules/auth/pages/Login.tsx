import { useState } from "react";
import LoginForm from "../components/LoginForm";
import type { LoginType } from "../../../types/authType";

const Login = () => {
  document.title = "Login - Mahihi";
  const [loginForm, setLoginForm] = useState<LoginType>({
    email: "",
    password: "",
  });

  const handleLogin = (data: LoginType) => {
    setLoginForm(data);
    console.log(loginForm);
  };

  return (
    <div
      className="relative min-h-screen flex justify-center items-center p-4 transition-colors duration-500"
      style={{
        backgroundImage: "var(--gradient)",
        color: "var(--text-color)",
        fontFamily: "var(--font-family)",
      }}
    >
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default Login;
