import { backendUrl } from "../App";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      console.log(response);

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log("error in login jsx", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Email Address
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              name="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>

          <div className="mb-3 min-w-72">
            <p className="mb-2 text-sm font-medium text-gray-700">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-2 text-white bg-black rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
