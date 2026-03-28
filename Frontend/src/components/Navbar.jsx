import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await API.get("/auth/logout");
            logout(); 
            navigate("/login");
        } catch (err) {
            console.error("Logout error", err);
        }
    };

    return (
        <nav className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-lg">
            <h1 className="text-xl font-bold">Task Manager</h1>
            {user && (
                <div className="flex items-center gap-4">
                    <span className="bg-slate-700 px-3 py-1 rounded text-sm italic">
                        Hello, {user.username} ({user.role})
                    </span>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded transition cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;