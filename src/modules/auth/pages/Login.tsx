import LoginForm from "../components/LoginForm";
import type { LoginType } from "../../../types/authType";
import { login } from "@/network/services/authenService";
import { useThemedToast } from "@/contexts/ToastService";

const Login = () => {
  document.title = "Login - Mahihi";
  const { showToast } = useThemedToast();

  const handleLogin = async (data: LoginType) => {
    const response = await login(data);
    if (response.isSuccess) {
      // Set jwt into local storage
      localStorage.setItem("token", response.value.accessToken);
      window.location.href = "/home";
    } else {
      showToast(JSON.stringify(response.errors), "error");
    }
    return response;
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
