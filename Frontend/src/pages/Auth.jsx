import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const inputClass =
  "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-400";

const Auth = ({ backendUrl, token, setToken }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isLogin) {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        if (response?.data?.success) {
          setToken(response?.data?.token);
          localStorage.setItem("token", response?.data?.token);
          setIsLogin(true);
        } else {
          toast.error(response?.data?.msg);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email: form.email,
          password: form.password,
        });
        if (response.data.success) {
          setToken(response?.data?.token);
          localStorage.setItem("token", response?.data?.token);
          setIsLogin(true);
        } else {
          toast.error(response.data.msg);
        }
      }
    } catch (error) {
      console.log("error in login auth", error);
      toast.error(error.message);
    }
    dispatch(
      login({ name: form.name || form.email.split("@")[0], email: form.email }),
    );
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-3xl sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-wide text-gray-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              {isLogin
                ? "Sign in to access your account"
                : "Join us for exclusive access and offers"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className={inputClass}
                />
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-gray-400 hover:text-black"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white text-sm font-semibold tracking-widest uppercase py-3.5 rounded-xl hover:bg-gray-800 active:scale-95 transition-all mt-2"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-400">
            {isLogin ? "Don't have an account? " : "Already registered? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-black hover:underline"
            >
              {isLogin ? "Create one here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Auth;
