import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { RegisterType } from "../../../types/authType";
import { getRandomImage } from "@/utils/imageRandom";

type RegisterFormProps = {
  handleRegister: (data: RegisterType) => Promise<{ isSuccess: boolean }>;
};

const RegisterForm = ({ handleRegister }: RegisterFormProps) => {
  const [image, setImage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<RegisterType>();

  const onSubmit = async (data: RegisterType) => {
    const result = await handleRegister(data);
    if (result.isSuccess) {
      reset();
    }
  };

  useEffect(() => {
    getRandomImage().then(setImage);
  }, []);

  return (
    <div
      className="flex flex-col md:flex-row items-center gap-6 md:gap-8 backdrop-blur-sm border rounded-2xl shadow-xl p-6 md:p-8 max-w-sm md:max-w-3xl w-full"
      style={{
        backgroundColor: "var(--gradient)",
        color: "var(--text-primary-color)",
        fontFamily: "var(--font-family)",
        border: "1.5px solid var(--border-color)",
      }}
    >
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center flex-1 order-1 md:order-none">
        <div className="relative">
          <img
            src={image}
            alt="Mahihi"
            width={180}
            height={180}
            className="drop-shadow-lg md:w-[180px] md:h-[180px] rounded-full object-cover"
          />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-center mt-3 md:mt-4 mb-1">
          Create new journey
        </h1>
        <p className="text-center text-xs md:text-sm max-w-xs hidden md:block">
          Join us in creating a new journey together.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px md:w-px md:h-auto md:self-stretch bg-[var(--border-color)] order-2 md:order-none"></div>

      {/* Form Section */}
      <div className="flex-1 w-full max-w-sm md:max-w-xs order-3 md:order-none">
        <form
          className="space-y-4 md:space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              Create Account
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label
                htmlFor="username"
                className="font-semibold text-sm mb-2 block"
              >
                Username
              </Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="border-2 border-gray-300 focus:border-[#1C2526] h-11 md:h-10 px-3 rounded-lg transition-all text-sm w-full"
                {...register("username", { required: true })}
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                className="font-semibold text-sm mb-2 block"
              >
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="border-2 border-gray-300 focus:border-[#1C2526] h-11 md:h-10 px-3 rounded-lg transition-all text-sm w-full"
                {...register("email", { required: true })}
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="font-semibold text-sm mb-2 block"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="border-2 border-gray-300 focus:border-[#1C2526] h-11 md:h-10 px-3 pr-10 rounded-lg transition-all text-sm w-full"
                  autoComplete="new-password"
                  {...register("password", { required: true })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-500"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded w-3 h-3" />
              <span className="text-xs md:text-xs">Remember me</span>
            </label>
            <a
              href="#"
              className="hover:underline font-medium text-xs md:text-xs"
            >
              Forgot Password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#1C2526] hover:bg-[#2a3739] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl h-11 md:h-10 text-sm mt-6"
            style={{
              backgroundColor: "var(--button-color)",
              color: "var(--button-text-color)",
            }}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>

          <div className="text-center text-xs pt-4 font-normal">
            Already have an account?{" "}
            <a href="/login" className="hover:underline font-bold">
              Sign in here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
