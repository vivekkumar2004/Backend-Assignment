import { useState } from "react";

const TaskRow = ({ task, currentUser, onUpdate, onDelete, onToggleStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || "",
  });


  const taskOwnerId = task.user?._id || task.user;
  

  const currentUserId = currentUser?._id || currentUser?.id;

  const isOwner = taskOwnerId && currentUserId && String(taskOwnerId) === String(currentUserId);
  const isAdmin = currentUser?.role === "admin";

  const handleSave = () => {
    onUpdate(task._id, editData, taskOwnerId);
    setIsEditing(false);
  };

  return (
    <tr className="hover:bg-slate-50 transition border-b border-slate-100">
      <td className="p-5">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <input
              className="border p-2 rounded outline-none"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
            <input
              className="border p-2 rounded outline-none"
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />
          </div>
        ) : (
          <div>
            <div className="font-bold text-slate-800">{task.title}</div>
            <div className="text-sm text-slate-500">{task.description}</div>
          </div>
        )}
      </td>

      <td className="p-5">
  
        <button
          onClick={() => isOwner && onToggleStatus(task._id, task.status, taskOwnerId)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
            task.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
          } ${!isOwner ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
        >
          {task.status}
        </button>
      </td>

      {isAdmin && (
        <td className="p-5 text-sm font-medium text-slate-600">
          {task.user?.username || "Guest"}
        </td>
      )}

      <td className="p-5 text-right">
        <div className="flex justify-end items-center gap-4">
        
          {isOwner && (
            isEditing ? (
              <button onClick={handleSave} className="text-green-600 font-bold text-sm cursor-pointer">Save</button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:underline text-sm cursor-pointer">Edit</button>
            )
          )}

          {(isOwner || isAdmin) && (
            <button
              onClick={() => onDelete(task._id, taskOwnerId)}
              className="text-rose-400 hover:text-rose-600 font-medium text-sm transition cursor-pointer"
            >
              Delete
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;