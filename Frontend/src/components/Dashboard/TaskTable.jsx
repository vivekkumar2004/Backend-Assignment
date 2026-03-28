import TaskRow from "./TaskRow";

const TaskTable = ({ tasks, currentUser, onDelete, onUpdate, onToggleStatus }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-800 text-white text-sm uppercase tracking-wider">
          <tr>
            <th className="p-5 font-semibold">Task Details</th>
            <th className="p-5 font-semibold">Status</th>
            {currentUser?.role === "admin" && <th className="p-5 font-semibold">Author</th>}
            <th className="p-5 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskRow
                key={task._id}
                task={task}
                currentUser={currentUser}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onToggleStatus={onToggleStatus}
              />
            ))
          ) : (
            <tr>
              <td colSpan={currentUser?.role === "admin" ? 4 : 3} className="py-20 text-center text-slate-400">
                <p className="text-lg">No tasks found. 🚀</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;