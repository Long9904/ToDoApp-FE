import LoginForm from "../components/LoginForm";
import type { LoginType } from "../../../types/authType";
import { login, loginWithGoogle } from "@/network/services/authenService";
import { useThemedToast } from "@/contexts/ToastService";
import "@google/model-viewer";

// Removed local declaration as it's already defined in global.d.ts

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

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const response = await loginWithGoogle(credentialResponse.credential);

      if (response.isSuccess) {
        localStorage.setItem("token", response.value.accessToken);
        localStorage.setItem("user", JSON.stringify(response.value.user));
        window.location.href = "/home";
      } else {
        showToast(JSON.stringify(response.errors), "error");
      }
    } catch (error) {
      showToast("Đăng nhập thất bại!", "error");
    }
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
      <LoginForm
        handleLogin={handleLogin}
        handleGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
};

export default Login;
