import type { RegisterType } from "../../../types/authType";
import { register } from "@/network/services/authenService";
import RegisterForm from "../components/RegisterForm";
import { useThemedToast } from "@/contexts/ToastService";

const Register = () => {
  document.title = "Register - Mahihi";
  const { showToast } = useThemedToast();

  const handleRegister = async (data: RegisterType) => {
    const response = await register(data);
    if (response.isSuccess) {
      showToast("Register successful! Please login.", "success");
      window.location.href = "/login";
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
      <RegisterForm handleRegister={handleRegister} />
    </div>
  );
};

export default Register;
