import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

type GoogleButtonProps = {
  handleGoogleLogin?: (credentialResponse: any) => void;
};

export default function GoogleButton({ handleGoogleLogin }: GoogleButtonProps) {
  const login = useGoogleLogin({
    onSuccess: (response) => handleGoogleLogin && handleGoogleLogin(response),
    onError: () => toast.error("Login Failed"),
  });

  return (
    <button
      onClick={() => login()}
      className="
        w-10 h-10 rounded-full
        flex items-center justify-center
        bg-white
        shadow-[0_4px_16px_rgba(0,0,0,0.15)]
        hover:shadow-[0_6px_22px_rgba(0,0,0,0.25)]
        transition-all duration-200
        hover:scale-105 active:scale-95
        border border-gray-200
      "
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="google"
        className="w-4 h-4"
      />
    </button>
  );
}
