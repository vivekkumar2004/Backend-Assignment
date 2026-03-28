import { useState } from "react";

const TaskForm = ({ onCreate }) => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newTask);
    setNewTask({ title: "", description: "" });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10">
      <h3 className="text-lg font-semibold mb-4 text-slate-700">Add New Task</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Title"
          className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition cursor-pointer">
          Create
        </button>
      </form>
    </div>
  );
};

export default TaskForm;