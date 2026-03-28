import { useEffect, useState, useContext } from "react";
import API from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TaskForm from "../components/Dashboard/TaskForm";
import TaskTable from "../components/Dashboard/TaskTable";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);


  const fetchTasks = async () => {
    try {
      const res = await API.get("/task/get-task");
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (newTaskData) => {
    try {
      await API.post("/task/create-task", newTaskData);
      fetchTasks();
    } catch (err) {
      alert("Create failed");
    }
  };

  const handleDelete = async (id, taskOwnerId) => {
    const isOwner = taskOwnerId?.toString() === user?._id?.toString();

    if (user.role === "admin" || isOwner) {
      if (window.confirm("Are you sure?")) {
        try {
          await API.delete(`/task/${id}`);
          fetchTasks();
        } catch (err) {
          alert("Delete failed");
        }
      }
    } else {
      alert("You can only delete your own tasks");
    }
  };

  const handleUpdate = async (id, updatedData, taskOwnerId) => {
    const isOwner = taskOwnerId?.toString() === user?._id?.toString();

    if (!isOwner) {
      alert("Action Denied: You can only edit your own tasks.");
      return;
    }

    try {
      await API.put(`/task/${id}`, updatedData);
      fetchTasks(); 
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.message || "Error"));
    }
  };

  const handleToggleStatus = async (id, currentStatus, taskOwnerId) => {
    const isOwner = taskOwnerId?.toString() === user?._id?.toString();
    if (isOwner) {
      const nextStatus = currentStatus === "pending" ? "completed" : "pending";
      try {
        await API.put(`/task/${id}`, { status: nextStatus });
        fetchTasks();
      } catch (err) {
        alert("Status update failed");
      }
    } else {
      alert("Only the owner can toggle status.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800">
            {user?.role === "admin" ? "Admin Dashboard" : "My Tasks"}
          </h2>
          <p className="text-slate-500">Welcome back, {user?.username}!</p>
        </header>
        <TaskForm onCreate={handleCreate} />
        <TaskTable
          tasks={tasks}
          currentUser={user}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
};

export default Dashboard;
