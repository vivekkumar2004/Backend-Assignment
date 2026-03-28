const express = require("express");
const taskRouter = express.Router();


const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");


const { identifyUser, restrictToAdmin } = require("../middleware/authMiddleware");


taskRouter.use(identifyUser); 


taskRouter.post("/create-task", createTask); 
taskRouter.get("/get-task", getTasks);
taskRouter.put("/:id", updateTask);  
taskRouter.delete("/:id", deleteTask);



module.exports = taskRouter;