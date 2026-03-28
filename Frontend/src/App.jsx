
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./Pages/Dashboard"

// --- PROTECTED ROUTE LOGIC ---
// Agar user login nahi hai, toh use login page pe bhej do
const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />

              
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;