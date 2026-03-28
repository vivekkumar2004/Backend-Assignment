import { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", role: "user" });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", formData);
            alert("Registration Successful! Now Login.");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-slate-100">
            <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
                <div className="space-y-4">
                    <input type="text" placeholder="Username" className="w-full p-3 border rounded-lg outline-none" onChange={e => setFormData({...formData, username: e.target.value})} required />
                    <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg outline-none" onChange={e => setFormData({...formData, email: e.target.value})} required />
                    <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg outline-none" onChange={e => setFormData({...formData, password: e.target.value})} required />
                    <select className="w-full p-3 border rounded-lg outline-none" onChange={e => setFormData({...formData, role: e.target.value})}>
                        <option value="user">Register as User</option>
                        <option value="admin">Register as Admin</option>
                    </select>
                    <button className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition cursor-pointer">Sign Up</button>
                </div>
                <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
            </form>
        </div>
    );
};

export default Register;