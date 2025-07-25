import { LoginForm } from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (credentials: { email: string; password: string; rememberMe: boolean }) => {
    // Mock authentication
    if (credentials.email && credentials.password) {
      toast.success("Successfully logged in!");
      navigate("/dashboard");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;