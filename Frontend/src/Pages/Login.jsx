import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });

      
      const userData = res.data.user || res.data;

      if (userData && (userData._id || userData.id)) {
        login(userData);
      
        setTimeout(() => navigate("/"), 100);
      } else {
        alert("User data missing ID!");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-slate-800 text-center">
          Login
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer">
            Login
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-bold cursor-pointer"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
