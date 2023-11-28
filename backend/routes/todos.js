const express = require("express");
const {
	getTodos,
	getTodo,
	createTodo,
	deleteTodo,
	updateTodo,
} = require("../controllers/todoController");
const router = express.Router();

// get all todos
router.get("/", getTodos);

// get a todo
router.get("/:id", getTodo);

// post a todo
router.post("/", createTodo);

// delete a todo
router.delete("/:id", deleteTodo);

// update/patch a todo
router.patch("/:id", updateTodo);

module.exports = router;
