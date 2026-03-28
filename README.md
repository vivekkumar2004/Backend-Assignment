🚀 Task Management System (MERN Stack)
A secure and functional Task Management application built using the MERN stack. This project focuses on Role-Based Access Control (RBAC), Modular Component Architecture, and Clean Code principles.

🏗️ Project Architecture
The project is divided into two main parts: the Backend (API) and the Frontend (UI). I have followed a modular approach to ensure the codebase remains maintainable and scalable.

📂 Folder Structure
Plaintext

/backend
  ├── models/          # Mongoose Schemas (User, Task)
  ├── routes/          # API Endpoints (Auth, Tasks)
  ├── controllers/     # Business Logic (CRUD operations, Auth logic)
  └── middleware/      # JWT Authentication & Route Protection

/frontend
  ├── src/
  │   ├── components/
  │   │   ├── Dashboard/ # Modular UI (TaskForm, TaskTable, TaskRow)
  │   │   └── Navbar.jsx # Navigation Component
  │   ├── pages/         # Page Views (Dashboard, Login, Register)
  │   └── context/       # State Management (AuthContext)
✨ Key Features
Secure Authentication: JWT-based login and registration. Tokens are stored in httpOnly cookies to prevent XSS attacks.
Role-Based Access Control (RBAC):
Admin: Can view all tasks from all users and has the authority to delete any task.
User: Full CRUD access (Create, Read, Update, Delete) restricted only to their own tasks.
Modular Component UI:
TaskForm: Dedicated component for task creation.
TaskTable: Manages the table layout and "No Tasks" empty state.
TaskRow: Handles individual task data, Inline Editing, and status toggling.
Inline Editing: Allows users to update task details directly within the table without page refreshes.
Responsive Design: Styled with Tailwind CSS for a modern and professional look.

🛠️ Tech Stack
Frontend: React.js, Vite, Tailwind CSS, Axios.
Backend: Node.js, Express.js.
Database: MongoDB Atlas (Mongoose ODM).
Security: JSON Web Tokens (JWT) & Bcrypt.js for password hashing.

🚀 Setup & Installation
1. Backend Setup
Navigate to the backend folder: cd backend
Install dependencies: npm install
Create a .env file and add your MONGO_URI and JWT_SECRET.
Start the server: npm start
2. Frontend Setup
Navigate to the frontend folder: cd frontend
Install dependencies: npm install
Start the development server: npm run dev
📈 Future Scope
Pagination: Implementing data fetching in chunks to handle thousands of tasks efficiently.
Search & Filter: Adding functionality to search tasks by title or filter by status (Pending/Completed).
Enhanced Logging: Integrating production-level error tracking and API request logging
